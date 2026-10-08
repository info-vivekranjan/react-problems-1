"use client";

import { countryList } from "@/constants/countryList";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

export default function Autocomplete() {
  const [data, setData] = useState<
    {
      name: string;
      code: string;
    }[]
  >([]);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    let timer;
    if (debouncedQuery.trim() === "") {
      setData([]);
      setLoading(false);

      return;
    }
    setLoading(true);

    timer = setTimeout(() => {
      let countryData = countryList
        .filter((country) => {
          return country.name
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase());
        })
        .slice(0, 10);

      setData(countryData);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedQuery]);

  return (
    <>
      <h1>Autocomplete</h1>
      <input
        type="text"
        name="country"
        id="country"
        placeholder="Search country"
        onChange={handleChange}
        value={query}
      />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.map((item) => {
              return (
                <p>
                  {item.code} - {item.name}
                </p>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
