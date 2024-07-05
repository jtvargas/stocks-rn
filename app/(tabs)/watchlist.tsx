import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList } from 'react-native';
import { Center } from "@gluestack-ui/themed"

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWatchlistContext } from '@/context/WatchlistContext';
import { StockCard } from '@/components/StockCard';

export default function Watchlist() {
  const { state, addWatchlist, removeWatchlist } = useWatchlistContext();

  const getWathlistItems = () => {
    return Object.keys(state)
  }

  const items = getWathlistItems()

  const removeStockFromWatchlist = (stockId: string) => {
    removeWatchlist(stockId)
  }

  const renderListItem = ({item} :{ item: string}) => {
    return (
      <ThemedView pt={"$6"}>
        <StockCard label={item} onPress={() => removeStockFromWatchlist(item)} change={2} marginalStatus='up' price={123} />
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f5f3ff', dark: '#f5f3ff' }}
      headerImage={<Ionicons size={310} name="eye" style={styles.headerImage} />}>
      <ThemedView p={"$6"}>
        <ThemedText type="title">Stock Watchlist</ThemedText>
        {items.length > 0 ?  <ThemedText type="default">Touch a card to remove from wathlist</ThemedText> :null}
        
        <FlatList
          data={items}
          renderItem={renderListItem}
          keyExtractor={item => item}
          scrollEnabled={false}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ height: "100%"}}
        />
      </ThemedView>
    </ParallaxScrollView>
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
