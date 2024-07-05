import { WatchlistState, WatchlistAction } from '@/types/watchlist';

export const watchlistReducer = (state: WatchlistState, action: WatchlistAction): WatchlistState => {
  switch (action.type) {
    case 'INIT': {
      return action.payload;
    }
    case 'ADD_WATCHLIST': {
      const newSymbol = action.payload;
      const newData = { symbol: newSymbol, addedAt: new Date() };
      const newState = { ...state, [newSymbol]: newData }
      return newState
    }
    case 'REMOVE_WATCHLIST': {
      const { [action.payload]: _, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};
