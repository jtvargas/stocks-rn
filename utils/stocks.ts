export type StockPriceData = {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
};

export const getMarginalStatus = (stockData: StockPriceData): 'up' | 'down' => {
  const { h, l, c } = stockData;
  const midpoint = (h + l) / 2;
  return c >= midpoint ? 'up' : 'down';
};