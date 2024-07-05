import { useState, useCallback } from 'react';
import { finnhubClient } from '@/utils/finnhubClient';
import { FinnhubError, StockData, SymbolSearchResult, StockSymbol, StockSymbolsResponse } from '@/types/finnhub';

export const useFinnhub = () => {
  const [symbolQuoteResults, setSymbolQuoteResults] = useState<StockData>();
  const [symbolSearchResults, setSymbolSearchResults] = useState<SymbolSearchResult[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const symbolSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    finnhubClient.symbolSearch(query, (error: FinnhubError, data: {count: number, result: SymbolSearchResult[]}) => {
      if (error) {
        setError(error.message);
      } else {
        if(data.count > 0 ){
           setSymbolSearchResults(data.result);
        }
      }
      setLoading(false);
    });
  }, []);

  const symbolQuote = async (query: string) => {
    setLoading(true);
    setError(null);

    if(!query) {
      return setSymbolQuoteResults(undefined)
    }

    finnhubClient.quote(query, (error: FinnhubError, data: StockData) => {
      if (error) {
        setError(error.message);
      } else {
        if(data.d){
          setSymbolQuoteResults(data);
        }
      }
      setLoading(false);
    });
  }


  return {
    symbolQuoteResults,
    symbolSearchResults,
    loading,
    error,
    symbolQuote,
    symbolSearch
  };
};
