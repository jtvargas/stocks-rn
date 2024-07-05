import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import debounce from 'lodash/debounce';
import toUpper from 'lodash/toUpper';
import { useFinnhub } from '@/hooks/useFinnhub';

type StockItem = {
  label: string; 
  value: string;
}
type StockItems = StockItem[];
export type IStockValue = StockItem | null;

type StocksDropdownProps = {
  value: string | null;
  onChange: (data: IStockValue) => void;
}

export function StocksDropdown(props: StocksDropdownProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { symbolSearchResults, loading, symbolSearch } = useFinnhub();

  const debounceSearch =  debounce(symbolSearch, 300);

  useEffect(() => {
    if (searchQuery.length > 1) {
      debounceSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleOnChange = (item: StockItem) => {
    props.onChange?.(item.value);
    setIsFocus(false);
  }

  const data = symbolSearchResults ? symbolSearchResults?.map(result => ({
    label: toUpper(result.displaySymbol),
    value: toUpper(result.displaySymbol),
  })): []

  console.log({searchQuery, data, symbolSearchResults})

  return (
    <>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#DADADA' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        iconStyle={styles.iconStyle}
        data={data || []}
        search
        maxHeight={300}
        mode={"modal"}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select stock' : '...'}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleOnChange}
        onChangeText={setSearchQuery}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </>
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
    width: "100%"

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
