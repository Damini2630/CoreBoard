// context/DashboardContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ department: [], rating: [] });
  const [bookmarks, setBookmarks] = useState([]);
  const [promoted, setPromoted] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const storedPromoted = JSON.parse(localStorage.getItem("promoted")) || [];
    setBookmarks(storedBookmarks);
    setPromoted(storedPromoted);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("promoted", JSON.stringify(promoted));
  }, [promoted]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const promoteEmployee = (id) => {
    setPromoted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const addEmployee = (newEmployee) => {
    const enhancedEmployee = {
      id: users.length + 100,
      ...newEmployee,
      performance: Math.floor(Math.random() * 5) + 1,
      bio: "A newly added employee.",
    };
    setUsers((prev) => [...prev, enhancedEmployee]);
  };

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("https://dummyjson.com/users?limit=20");
      const data = await res.json();
      const enhanced = data.users.map((u) => ({
        ...u,
        department: ["HR", "Engineering", "Marketing", "Finance"][
          Math.floor(Math.random() * 4)
        ],
        performance: Math.floor(Math.random() * 5) + 1,
        bio: "A dedicated team player with a focus on growth and performance.",
      }));
      setUsers(enhanced);
      setFilteredUsers(enhanced);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    let result = users;

    if (search) {
      result = result.filter((u) =>
        [u.firstName, u.lastName, u.email, u.department]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filters.department.length) {
      result = result.filter((u) => filters.department.includes(u.department));
    }

    if (filters.rating.length) {
      result = result.filter((u) => filters.rating.includes(u.performance));
    }

    setFilteredUsers(result);
  }, [search, filters, users]);

  const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));
  const promotedUsers = users.filter((u) => promoted.includes(u.id));

  return (
    <DashboardContext.Provider
      value={{
        users,
        filteredUsers,
        setSearch,
        setFilters,
        bookmarks,
        promoted,
        toggleBookmark,
        promoteEmployee,
        addEmployee,
        bookmarkedUsers,
        promotedUsers,
        setPromoted,
        setBookmarks,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
