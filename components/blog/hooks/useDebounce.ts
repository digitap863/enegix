import { useState, useEffect } from "react";

/**
 * Delays updating the returned value until `delay` ms have passed
 * since the last change to `value`. Useful for search inputs to
 * prevent firing expensive operations on every keystroke.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
