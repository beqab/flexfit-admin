import { useEffect, useState, useRef } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    if (value === previousValueRef.current) {
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      previousValueRef.current = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  useEffect(() => {
    if (delay === 0) {
      setDebouncedValue(value);
      previousValueRef.current = value;
    }
  }, [value, delay]);

  return debouncedValue;
}
