import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { Alert, AlertContextType } from '@/types/stockAlert';
import { usePersistentState } from '@/hooks/usePersistentState';
import { useStockSocket } from '@/hooks/useStockSocket';

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: WatchlistProviderProps) => {
  const [alerts, setAlerts] = usePersistentState<{ [key: string]: Alert }>('alerts', {});
  const { stockData } = useStockSocket(Object.keys(alerts));

  // Function to add a new alert
  const addAlert = (alert: Alert) => {
    setAlerts(prevAlerts => ({
      ...prevAlerts,
      [alert.symbol]: alert,
    }));  };

  // Function to remove an alert
  const removeAlert = (symbol: string) => {
    setAlerts(prevAlerts => {
      const { [symbol]: _, ...rest } = prevAlerts;
      return rest;
    });  };

  // Check stock prices and trigger notifications
  useEffect(() => {
    Object.values(alerts).forEach(alert => {
      const currentPrice = stockData[alert.symbol]?.c;
      if (currentPrice && currentPrice > alert.price) {
        Notifier.showNotification({
          title: `Price Alert for ${alert.symbol}`,
          description: `The price of ${alert.symbol} is now $${currentPrice}, which is higher than your alert price of $${alert.price}.`,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success',
          },
        });
        removeAlert(alert.symbol); // Remove the alert after notification
      }
    });
  }, [stockData, alerts]);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};
