import { useEffect, useState } from "react";

export function useDebounce(query: string, delay = 500) {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);
  }, [query, delay]);

  return debouncedQuery;
}
