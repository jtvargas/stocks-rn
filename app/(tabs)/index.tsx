import React, { useMemo, useState, useEffect } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import debounce from 'lodash/debounce'
import toUpper from 'lodash/toUpper';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StockCard } from '@/components/StockCard';
import { useWatchlistContext } from "@/context/WatchlistContext"
import { Input,InputField,InputSlot,InputIcon, SearchIcon,  VStack } from '@gluestack-ui/themed';
import { useFinnhub } from '@/hooks/useFinnhub';
import { getMarginalStatus } from '@/utils/stocks';

const stocks = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export default function StocksScreen() {
  const { symbolSearchResults, stockSymbols, loading, error, symbolSearch, fetchStockSymbols } = useFinnhub();
  const [query, setQuery] = useState<string>('');
  const {  addWatchlist  } = useWatchlistContext();

  useEffect(() => {
    fetchStockSymbols("US")
  }, [])

 
  const handlePressCard = () => {
    addWatchlist(query)
  }


  const handleSearch = (symbol: string) => {
    setQuery(symbol);
    symbolSearch(symbol)
  };
  const debounceSearch = debounce(handleSearch, 300)


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ecfdf5', dark: '#ecfdf5' }}
      headerImage={<Ionicons size={310} name="bar-chart" style={styles.headerImage} color={"#059669"} />}>
      <ThemedView p="$6">
        <VStack pb={"$6"}>
          <ThemedText type="title">Stocks</ThemedText>
          <ThemedText type="default" italic pb={"$2"}>Touch a card to add to your watchlist</ThemedText>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
              <InputSlot pl="$3">
                <InputIcon as={SearchIcon} />
              </InputSlot>
            <InputField placeholder="Search stock by symbol..." onChangeText={debounceSearch}/>
          </Input>
        </VStack>
       
      {symbolSearchResults && !loading?  <StockCard change={symbolSearchResults.d} label={toUpper(query)} price={symbolSearchResults.c} marginalStatus={getMarginalStatus(symbolSearchResults)} onPress={handlePressCard}/>: null}
               
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
