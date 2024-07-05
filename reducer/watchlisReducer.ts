import { WatchlistState, WatchlistAction } from '@/types/watchlist';

export const watchlistReducer = (state: WatchlistState, action: WatchlistAction): WatchlistState => {
  switch (action.type) {
    case 'INIT': {
      return action.payload;
    }
    case 'ADD_WATCHLIST': {
      const stockData = action.payload;
      const newData = { addedAt: new Date(), ...stockData };
      const newState = { ...state, [stockData.symbol]: newData }
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
