export interface Alert {
  symbol: string;
  price: number;
}

export interface AlertContextType {
  alerts: { [key: string]: Alert };
  addAlert: (alert: Alert) => void;
  removeAlert: (symbol: string) => void;
}