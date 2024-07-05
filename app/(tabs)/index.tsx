import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StockCard } from '@/components/StockCard';
import { StocksDropdown, IStockValue } from '@/components/StocksDropdown';
import { useWatchlistContext } from "@/context/WatchlistContext"
import { HStack, VStack } from '@gluestack-ui/themed';

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

export default function HomeScreen() {
  const [stockSelected, setStock] = useState<string | null>(null);
  const { state, addWatchlist, removeWatchlist } = useWatchlistContext();

  const handleOnSelectStock = (item:  IStockValue) => {
    if(item && item.value) {
      setStock(item.value)
    }
  }

  const handlePressCard = () => {
    addWatchlist("APPL")
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ecfdf5', dark: '#ecfdf5' }}
      headerImage={<Ionicons size={310} name="bar-chart" style={styles.headerImage} color={"#059669"} />}>
      <ThemedView p="$6">
        <VStack pb={"$6"}>
          <ThemedText type="title">Stocks Chart</ThemedText>
          <ThemedText type="default">Touch a card to add to your watchlist</ThemedText>
        </VStack>
       

        <StockCard change={2} label='APPL' price={220} marginalStatus='up' onPress={handlePressCard}/>
        <StocksDropdown data={stocks} value={stockSelected} onChange={handleOnSelectStock}/>
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
