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

export default function StocksScreen() {
  const { loading, symbolSearch, symbolQuote, symbolQuoteResults } = useFinnhub();
  const [query, setQuery] = useState<string>('');
  const {  addWatchlist, removeWatchlist, state  } = useWatchlistContext();

 
  const handlePressCard = () => {
    if(state[query]) {
      console.log(`symbol: ${query} already watched`)
      removeWatchlist(query)
    } else {
      addWatchlist({
        symbol: query,
        l: symbolQuoteResults?.l as number,
        h: symbolQuoteResults?.h as number,
        o: symbolQuoteResults?.o as number
      })
    }
  }


  const handleSearch = (symbol: string) => {
    setQuery(toUpper(symbol));
    symbolQuote(symbol)
  };
  const debounceSearch = debounce(handleSearch, 300)


  console.log({symbolQuoteResults})
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
            <InputField placeholder="Search stock by symbol..." onChangeText={debounceSearch} autoCorrect={false} autoCapitalize='none'/>
          </Input>
        </VStack>
       
      {symbolQuoteResults && !loading?  <StockCard change={symbolQuoteResults.d} label={query} price={symbolQuoteResults.c} marginalStatus={getMarginalStatus(symbolQuoteResults)} onPress={handlePressCard}/>: null}
               
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
