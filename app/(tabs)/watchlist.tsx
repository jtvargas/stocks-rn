import { useEffect } from "react";
import { StyleSheet, FlatList } from 'react-native';
import { Center } from "@gluestack-ui/themed"
import { SafeAreaView } from 'react-native-safe-area-context';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWatchlistContext } from '@/context/WatchlistContext';
import { StockCard } from '@/components/StockCard';
import { useStockSocket } from "@/hooks/useStockSocket"
import { useAlertContext } from "@/context/AlertContext"
import { StockChart } from '@/components/StockChart';
import { getChange } from "@/utils/stocks";


const getWatchlistItems = (state: any) => {
  return Object.keys(state)
}

export default function Watchlist() {
  const { state, removeWatchlist } = useWatchlistContext();
  const symbolsWatched = getWatchlistItems(state)
  const { stockData, socket } = useStockSocket(symbolsWatched);
  const { alerts } = useAlertContext();

  const removeStockFromWatchlist = (stockId: string) => {
    removeWatchlist(stockId)
    if(socket) {
      socket.send(JSON.stringify({ type: 'unsubscribe', symbol: stockId }));
    }
  }

  const getStockChangeData = (symbol: string) => {
    const baseStockInfo = state[symbol];
    const currentPrice = stockData[symbol]?.p ?? 100

    return getChange( currentPrice,  baseStockInfo.o) ?? 100
  }

  const renderListItem = ({item} :{ item: string}) => {
    return (
      <ThemedView pt={"$6"}>
        <StockCard label={item} onPress={() => removeStockFromWatchlist(item)} change={getStockChangeData(item)} marginalStatus='up' price={stockData[item]?.p} alertPrice={alerts[item]?.price} />
      </ThemedView>
    )
  }
  const renderEmptyList = () => {
    return (
      <Center pt={"$6"}>
         <ThemedText type="default" bold italic>No stocks added to your watchlist</ThemedText>
         <ThemedText type="default" textAlign='center'>To add a stock you need to press a stock card</ThemedText>
      </Center>
    )
  }


  return (
      <SafeAreaView style={{backgroundColor: '#6ee7b7'}}>
       <StockChart charLabels={symbolsWatched} chartData={symbolsWatched.map((stock) => stockData[stock]?.p ?? 100)}/>
    
       <ThemedView p={"$6"}>
        <ThemedText type="title">Stock Watchlist</ThemedText>
        {symbolsWatched.length > 0 ?  <ThemedText type="default">Touch a card to remove from wathlist</ThemedText> :null}
     
        <FlatList
          data={symbolsWatched}
          renderItem={renderListItem}
          keyExtractor={item => item}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ height: "100%"}}
        />
      </ThemedView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#7c3aed',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
