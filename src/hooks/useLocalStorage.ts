import { useState, Dispatch, SetStateAction, useCallback } from 'react';

type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>, () => void];

function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorage<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window?.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window?.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // log error
      }
    },
    [key, storedValue],
  );

  const deleteValue = () => {
    try {
      window?.localStorage.removeItem(key);
    } catch (error) {
      // log error
    }
  };

  return [storedValue, setValue, deleteValue];
}

export default useLocalStorage;
