import React from 'react'
import { Image, StyleSheet, Platform } from 'react-native';
import { HStack, VStack,   Button, ButtonText, Switch} from '@gluestack-ui/themed';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NumberInput } from '@/components/NumberInput';

export default function HomeScreen() {
  const [value, setValue] = React.useState(0.0);

  return (
      <VStack p="$6" alignItems='center'  space='4xl'>
        <ThemedText type="title">APPL</ThemedText>
        <ThemedText type="default">When price is under</ThemedText>
        <NumberInput value={value} onChangeValue={setValue} style={{fontSize: 28 , color: "#059669" }} autoFocus/>
        <HStack space="md" alignItems='center'>
          <Switch />
          <ThemedText size="sm">Allow notifications</ThemedText>
        </HStack>
        <Button
          size="md"
          variant="solid"
          action="primary"
          bgColor='$tertiary600'
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => alert(`selected: ${value}`)}
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
