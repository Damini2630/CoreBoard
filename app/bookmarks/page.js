"use client";
import { useDashboard } from "../../context/DashboardContext";
import React, { useState } from "react";
import Toast from "../../components/Toast";
import Link from "next/link";

export default function BookmarksPage() {
  const { users, bookmarks, toggleBookmark, promoteEmployee, promoted } = useDashboard();
  const [showToast, setShowToast] = useState(false);
  const handlePromote = (id) => {
    promoteEmployee(id);
    setShowToast(true);
  };

  const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));

  if (bookmarkedUsers.length === 0) {
    return <div className="p-6 text-gray-600">No bookmarks found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {bookmarkedUsers.map((user) => (
          <div key={user.id} className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
            <p>{user.email} | Dept: {user.department}</p>

            <div className="flex gap-2 mt-3">
              <Link href={/employee/${user.id}} className="text-blue-500 hover:underline">View</Link>
              <button onClick={() => toggleBookmark(user.id)} className="text-red-500 hover:underline">
                Remove Bookmark
              </button>
              <Toast message="Employee Promoted!" show={showToast} />
              <button onClick={() => handlePromote(user.id)} className="text-green-600 hover:underline">
                {promoted.includes(user.id) ? "Promoted ✅" : "Promote"}
              </button>
              <button className="text-indigo-500 hover:underline">Assign to Project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
