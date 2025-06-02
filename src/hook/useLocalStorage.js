import { useState, useEffect, useCallback } from "react";

export function useLocalStore(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Lỗi đọc localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Chỉ cập nhật nếu giá trị thay đổi
        if (JSON.stringify(valueToStore) === JSON.stringify(storedValue))
          return;

        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Lỗi ghi localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Đồng bộ với localStorage khi tab khác thay đổi
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setStoredValue(
          event.newValue ? JSON.parse(event.newValue) : initialValue
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
