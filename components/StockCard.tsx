import { TouchableOpacity } from 'react-native';
import { Box, Text, HStack, VStack } from '@gluestack-ui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

type StockCard = {
  label: string;
  change: number;
  price: number;
  marginalStatus: "up" | "down";
  onPress: () => void;
};

export function StockCard(props: StockCard) {
  return (
    <TouchableOpacity onPress={props.onPress}>
    <Box bg="$secondary100" p="$2" borderRadius="$sm" borderColor='$secondary200' borderWidth={'$1'}>
      <HStack space="md" justifyContent='space-between' reversed={false} >
      <VStack space="md" reversed={false}>
      <Box >
        <Text color="$secondary900" bold>{props.label}</Text>
        </Box>
        <HStack space='sm' alignItems='center'>
        <Ionicons size={24} name={props.marginalStatus === 'up' ? "trending-up": "trending-down"} color={props.marginalStatus === 'up' ? "#10b981": "#e11d48"}/>
        <Text color={props.marginalStatus === 'up' ? "$tertiary500" : "$rose600"}  size='2xl'>%{props.change}</Text>
        </HStack>
      </VStack>
        <Box  >
          <Text color="$secondary900" size='lg' bold>${props.price}</Text>
        </Box>
      </HStack>
    </Box>
    </TouchableOpacity>
  )
}