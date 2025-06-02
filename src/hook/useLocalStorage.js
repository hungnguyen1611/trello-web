import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Lấy giá trị từ localStorage nếu có, nếu không dùng giá trị mặc định
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("useLocalStorage error reading:", error);
      return initialValue;
    }
  });

  // Hàm dùng để cập nhật localStorage và state cùng lúc
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("useLocalStorage error setting:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
