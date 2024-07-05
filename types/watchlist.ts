export type StockWatchlistItem = {
  symbol: string;
  l: number,
  h: number,
  o: number,
  addedAt: Date;
};

export type StockPayload = {
  symbol: string
  l: number,
  h: number,
  o: number,
}
export type WatchlistState = {
  [key: string]: StockWatchlistItem;
};

export type WatchlistAction =
  | { type: 'INIT'; payload: WatchlistState }
  | { type: 'ADD_WATCHLIST'; payload: StockPayload }
  | { type: 'REMOVE_WATCHLIST'; payload: string };

export type WatchlistContextType = {
  state: WatchlistState;
  addWatchlist: (stockItem: StockPayload) => void;
  removeWatchlist: (symbol: string) => void;
};