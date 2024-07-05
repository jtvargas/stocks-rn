import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

type StockItem = {
   label: string; 
   value: string;
}
type StockItems = StockItem[];
export type IStockValue =  StockItem | null;

type StocksDropdownProps = {
   value: string | null;
   data: StockItems
   onChange: (data: IStockValue) => void;
}

export function StocksDropdown(props:StocksDropdownProps ) {
  const [isFocus, setIsFocus] = useState(false);

  const handleOnChange = (item: StockItem) => {
    props.onChange?.(item);
    setIsFocus(false);
  }

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#DADADA' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        iconStyle={styles.iconStyle}
        data={props.data || []}
        search
        maxHeight={300}
        mode={"modal"}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleOnChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9E9E9',
  },
  dropdown: {
    height: 50,
    borderColor: '#DADADA',
    borderWidth: 0.5,
    borderRadius: 2,
    paddingHorizontal: 8,
  },
  containerStyle: {
    borderColor: '#DADADA',
    borderWidth: 0.5,
    borderRadius: 8,
    height: "50%",
  },
  itemContainerStyle: {
    borderColor: '#DADADA',
    borderBottomWidth: 0.5,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});