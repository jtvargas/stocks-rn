import React from 'react'
import { Image, StyleSheet, Platform } from 'react-native';
import { HStack, VStack,   Button, ButtonText, Switch} from '@gluestack-ui/themed';
import { Link, router } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StocksDropdown } from "@/components/StocksDropdown"
import { NumberInput } from '@/components/NumberInput';
import { useAlertContext } from "@/context/AlertContext"

export default function HomeScreen() {
  const { alerts, addAlert, removeAlert } = useAlertContext();
  const [valuePrice, setValuePrice] = React.useState(0.0);
  const [selectedSymbol, setSymbol] = React.useState("");

  const handleCreateAlert = () =>{
    if (valuePrice && selectedSymbol) {
      addAlert({ symbol: selectedSymbol, price: valuePrice });
      setSymbol('');
      setValuePrice(0.0)
      router.dismiss()
    }
  }

  return (
      <VStack p="$6" alignItems='center'  space='4xl'>
        <StocksDropdown value={selectedSymbol} onChange={setSymbol}/>
        <ThemedText type="default">When price is under</ThemedText>
        <NumberInput value={valuePrice} onChangeValue={setValuePrice} style={{fontSize: 28 , color: "#059669" }} autoFocus/>
        <Button
          size="md"
          variant="solid"
          action="primary"
          bgColor='$tertiary600'
          isDisabled={false}
          isFocusVisible={false}
          onPress={handleCreateAlert}
        >
          <ButtonText>Create Alert </ButtonText>
        </Button>
      </VStack>


  );
}

const styles = StyleSheet.create({
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
