import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { saveItem, getItem } from '@/utils/storageUtils';

export const usePersistentState = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const loadState = async () => {
      const savedState = await getItem<T>(key);
      if (savedState !== null) {
        setState(savedState);
      }
    };
    loadState();
  }, [key]);

  useEffect(() => {
    const saveState = async () => {
      await saveItem(key, state);
    };
    saveState();
  }, [key, state]);

  return [state, setState];
};
