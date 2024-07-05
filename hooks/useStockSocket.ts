import { useState, useEffect, useRef, useCallback} from 'react';
import { StockData } from '@/types/finnhub';
import { ENV } from "@/utils/environment"
import throttle from 'lodash/throttle';

const SOCKET_SERVER_URL = 'wss://ws.finnhub.io?token=cq40s81r01qv1ml4bl20cq40s81r01qv1ml4bl2g';
const API_TOKEN = ENV.FINNHUB_API_KEY;


export const useStockSocket = (symbols: string[]) => {
  const [stockData, setStockData] = useState<{ [key: string]: StockData }>({});
  const [connected, setConnected] = useState<boolean>(false);
  const finnSocketRef = useRef<WebSocket | null>(null);
  const subscribedSymbolsRef = useRef<Set<string>>(new Set());

  const throttledSetStockData = useCallback(throttle((tradeData: StockData) => {
    setStockData((prevData) => ({
      ...prevData,
      [tradeData.s]: tradeData,
    }));
  }, 1200), []);
  
  useEffect(() => {
    const ws = new WebSocket(SOCKET_SERVER_URL);

    ws.onopen = () => {
      setConnected(true);
      console.log('Connected to socket server');
      finnSocketRef.current = ws;
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('Disconnected from socket server');
      finnSocketRef.current = null;
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade') {
        data.data.forEach((tradeData: StockData) => {
          throttledSetStockData(tradeData);
        });
      }
    };

    return () => {
      ws.close();
      setConnected(false);
      finnSocketRef.current = null;
      subscribedSymbolsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (connected && finnSocketRef.current) {
      const socket = finnSocketRef.current;
      const newSymbolsSet = new Set(symbols);
      const currentSymbolsSet = subscribedSymbolsRef.current;

      // Unsubscribe from symbols that are no longer present
      currentSymbolsSet.forEach((symbol) => {
        if (!newSymbolsSet.has(symbol)) {
          socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
          console.log(`unsubscribed from: ${symbol}`)
          currentSymbolsSet.delete(symbol);
        }
      });

      // Subscribe to new symbols
      newSymbolsSet.forEach((symbol) => {
        if (!currentSymbolsSet.has(symbol)) {
          socket.send(JSON.stringify({ type: 'subscribe', symbol }));
          currentSymbolsSet.add(symbol);
        }
      });
    }
  }, [connected, symbols]);

  return {
    stockData,
    connected,
  };
};
