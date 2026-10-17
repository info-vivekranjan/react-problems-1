"use client";
import { countryList } from "@/constants/countryList";
import React, { useEffect, useState } from "react";

function useDebounce(query: string, delay = 1000) {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDebouncedSearch(query);
    }, delay);
  }, [query, delay]);

  return debouncedSearch;
}

export default function AutoComplete() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<{ name: string }[]>([]);
  const debouncedSearch = useDebounce(search);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setData([]);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const filteredData = countryList.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase().trim());
      });

      setData(filteredData);
      setIsLoading(false);
    }, 2000);
  }, [debouncedSearch]);

  console.log(data);
  return (
    <>
      <h1>Auto Complete</h1>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        style={{ width: "300px", padding: "10px" }}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.length > 0 && (
            <div
              style={{
                width: "300px",
                height: "250px",
                overflowY: "auto",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                backgroundColor: "white",
              }}
            >
              {data.map((item) => {
                return <div style={{ margin: "10px" }}>{item.name}</div>;
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
