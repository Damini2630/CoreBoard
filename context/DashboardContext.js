// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const DashboardContext = createContext();

// export function DashboardProvider({ children }) {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({ department: [], rating: [] });
//   const [bookmarks, setBookmarks] = useState([]);
//   const [promoted, setPromoted] = useState([]);

//   // Load bookmarks and promotions from localStorage on mount
//   useEffect(() => {
//     const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
//     const storedPromoted = JSON.parse(localStorage.getItem("promoted")) || [];
//     setBookmarks(storedBookmarks);
//     setPromoted(storedPromoted);
//   }, []);

//   // Persist bookmarks/promoted to localStorage
//   useEffect(() => {
//     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//   }, [bookmarks]);

//   useEffect(() => {
//     localStorage.setItem("promoted", JSON.stringify(promoted));
//   }, [promoted]);

//   // 🔧 Fix: Define these two functions
//   const toggleBookmark = (id) => {
//     setBookmarks((prev) =>
//       prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
//     );
//   };

//   const promoteEmployee = (id) => {
//     setPromoted((prev) => (prev.includes(id) ? prev : [...prev, id]));
//   };

//   // Fetch and enhance user data
//   useEffect(() => {
//     async function fetchUsers() {
//       const res = await fetch("https://dummyjson.com/users?limit=20");
//       const data = await res.json();
//       const enhanced = data.users.map((u) => ({
//         ...u,
//         department: ["HR", "Engineering", "Marketing", "Finance"][
//           Math.floor(Math.random() * 4)
//         ],
//         performance: Math.floor(Math.random() * 5) + 1,
//         bio: "A dedicated team player with a focus on growth and performance.",
//       }));
//       setUsers(enhanced);
//       setFilteredUsers(enhanced);
//     }

//     fetchUsers();
//   }, []);

//   // Search & Filter logic
//   useEffect(() => {
//     let result = users;

//     // Search filter
//     if (search) {
//       result = result.filter((u) =>
//         [u.firstName, u.lastName, u.email, u.department]
//           .join(" ")
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       );
//     }

//     // Department filter
//     if (filters.department.length) {
//       result = result.filter((u) => filters.department.includes(u.department));
//     }

//     // Rating filter
//     if (filters.rating.length) {
//       result = result.filter((u) => filters.rating.includes(u.performance));
//     }

//     setFilteredUsers(result);
//   }, [search, filters, users]);

//   return (
//     <DashboardContext.Provider
//       value={{
//         users,
//         filteredUsers,
//         setSearch,
//         setFilters,
//         bookmarks,
//         toggleBookmark,
//         promoteEmployee,
//         promoted,
//       }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// }

// export const useDashboard = () => useContext(DashboardContext);


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

  // Load from localStorage on first mount
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const storedPromoted = JSON.parse(localStorage.getItem("promoted")) || [];
    setBookmarks(storedBookmarks);
    setPromoted(storedPromoted);
  }, []);

  // Persist bookmarks and promoted to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("promoted", JSON.stringify(promoted));
  }, [promoted]);

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  // Promote employee
  const promoteEmployee = (id) => {
    setPromoted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // Fetch and enhance user data
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

  // Search & Filter logic
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

  // Derived data
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
        bookmarkedUsers,
        promotedUsers,
        setPromoted, // Optional for external control
        setBookmarks,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);

