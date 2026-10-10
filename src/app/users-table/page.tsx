"use client";

import { usersData } from "@/constants/usersData";
import { useEffect, useState } from "react";

const useDebounceSearch = (query: string, delay = 500) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDebouncedSearch(query);
    }, delay);
  }, [query, delay]);

  return debouncedSearch;
};

export default function UsersTablePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceSearch(search);

  const limit = 2;
  const startIndex = (page - 1) * limit;

  const getFiltedredUsersData = () => {
    const data = usersData
      .filter((user) => {
        return (
          user.name
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase()) ||
          user.role.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
        );
      })
      .slice(startIndex, limit * page);

    return data;
  };

  const handleBack = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  console.log(getFiltedredUsersData());

  return (
    <>
      <h1>Users Table</h1>
      <div>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ padding: "10px", marginBottom: "20px" }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>CITY</th>
            <th>EXPERIENCE</th>
            <th>ROLE</th>
            <th>SALARY</th>
            <th>SKILLS</th>
            <th>ACTIVE</th>
          </tr>
        </thead>
        <tbody>
          {getFiltedredUsersData().map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>{`${user.experience} Years`}</td>
                <td>{user.role}</td>
                <td>{user.salary}</td>
                <td>{user.skills.map((skill) => skill + " ")}</td>
                <td>
                  {user.isActive ? (
                    <span style={{ color: "green" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>Inactive</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button onClick={handleBack} disabled={page === 1}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={usersData.length <= limit * page}
        >
          Next
        </button>
      </section>
    </>
  );
}
