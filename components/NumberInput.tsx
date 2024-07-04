import React from 'react';
import { type TextProps } from 'react-native';
import CurrencyInput, { CurrencyInputProps} from 'react-native-currency-input';

type NumberInputProps = TextProps  & CurrencyInputProps

export function NumberInput(props: NumberInputProps) {

  return <CurrencyInput 
    value={props.value} 
    onChangeValue={props.onChangeValue} 
    // precision={0}  
    prefix="$"
    delimiter=","
      separator="."
      precision={1}
      {...props}
    />;
}
