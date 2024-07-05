export type SymbolSearchResult = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

export type StockData = {
  "c": number,
  "d": number | null,
  "dp": number,
  "h": number,
  "l": number,
  "o": number,
  "pc": number,
  "p": number
}

export type FinnhubError = {
  message: string;
};

export type StockSymbol = {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
};

export type StockSymbolsResponse = StockSymbol[];

