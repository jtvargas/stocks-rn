import { useState, useCallback } from 'react';
import { finnhubClient } from '@/utils/finnhubClient';
import { FinnhubError, StockData, SymbolSearchResult, StockSymbol, StockSymbolsResponse } from '@/types/finnhub';

export const useFinnhub = () => {
  const [stockSymbols, setStockSymbols] = useState<StockSymbolsResponse>([]);
  const [symbolSearchResults, setSymbolSearchResults] = useState<StockData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const symbolSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    finnhubClient.quote(query, (error: FinnhubError, data: StockData) => {
      if (error) {
        setError(error.message);
      } else {
        if(data.d){
           setSymbolSearchResults(data);
        } else {
          setSymbolSearchResults(undefined);
        }
      }
      setLoading(false);
    });
  }, []);

  const fetchStockSymbols = useCallback((market: string) => {
    setLoading(true);
    setError(null);

    finnhubClient.stockSymbols(market, (error: FinnhubError, data: StockSymbolsResponse) => {
      if (error) {
        setError(error.message);
      } else {
        setStockSymbols(data);
      }
      setLoading(false);
    });
  }, []);

  return {
    stockSymbols,
    symbolSearchResults,
    loading,
    error,
    symbolSearch,
    fetchStockSymbols
  };
};
