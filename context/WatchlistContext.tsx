import React, { createContext, useContext, ReactNode, useEffect, useReducer } from 'react';
import {getItem, saveItem} from "@/utils/storageUtils"
import { WatchlistState, WatchlistContextType, WatchlistAction, StockPayload } from '@/types/watchlist';
import { watchlistReducer } from "@/reducer/watchlisReducer"

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

interface WatchlistProviderProps {
  children: ReactNode;
}

const initialValue: WatchlistState = {};


export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const [state, dispatch] = useReducer(watchlistReducer, initialValue);

  useEffect(() => {
    const loadState = async () => {
      const savedState = await getItem<WatchlistState>('watchlist');
      console.log({savedState})
      if (savedState !== null) {
        dispatch({ type: 'INIT', payload: savedState } as WatchlistAction); // Use an appropriate action type for initialization
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    persistState(state)
  }, [state]);

  const persistState = async (newState: WatchlistState) => {
    await saveItem('watchlist', newState);
  }

  const addWatchlist = (stockItem: StockPayload) => {
    dispatch({ type: 'ADD_WATCHLIST', payload: stockItem });
  };

  const removeWatchlist = (symbol: string) => {
    dispatch({ type: 'REMOVE_WATCHLIST', payload: symbol });
  };

  return (
    <WatchlistContext.Provider value={{ state, addWatchlist, removeWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlistContext = (): WatchlistContextType => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlistContext must be used within an WatchlistProvider');
  }
  return context;
};
