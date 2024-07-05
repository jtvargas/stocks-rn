import {  Dimensions } from 'react-native'
import React from 'react'
import {
  BarChart,
} from "react-native-chart-kit";
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Center } from '@gluestack-ui/themed';

type StockChartProps = {
  charLabels: string[];
  chartData: number[];
}
export function StockChart(props: StockChartProps) {
  const isEmpty = props.charLabels?.length === 0 || props.charLabels === undefined

  if (isEmpty) {
    return (
      <Center height={220} p={"$6"}>
        <ThemedText textAlign='center' italic bold>No graph available, add some stocks to your watchlist</ThemedText>
      </Center>
    )
  }

  return (
    <>
    <BarChart
      data={{
        labels: props.charLabels || [],
        datasets: [
          {
            data: props.chartData || []
          }
        ]
      }}
      width={Dimensions.get("screen").width} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisSuffix=""
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#059669",
        backgroundGradientFrom: "#047857",
        backgroundGradientTo: "#10b981",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
    />
    </>
   
  )
}