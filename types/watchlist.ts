export type StockWatchlistItem = {
  symbol: string;
  addedAt: Date;
};

export type WatchlistState = {
  [key: string]: StockWatchlistItem;
};

export type WatchlistAction =
  | { type: 'INIT'; payload: WatchlistState }
  | { type: 'ADD_WATCHLIST'; payload: string }
  | { type: 'REMOVE_WATCHLIST'; payload: string };

export type WatchlistContextType = {
  state: WatchlistState;
  addWatchlist: (symbol: string) => void;
  removeWatchlist: (symbol: string) => void;
};