declare module 'finnhub' {
  export const ApiClient: {
    instance: {
      authentications: {
        api_key: {
          apiKey: string;
        };
      };
    };
  };

  export class DefaultApi {
    symbolSearch(
      symbol: string,
      callback: (error: { message: string }, data: { count: number; result: { description: string; displaySymbol: string; symbol: string; type: string; }[] }) => void
    ): void;
  }
}
