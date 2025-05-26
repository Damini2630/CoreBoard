"use client";
import { useDashboard } from "../context/DashboardContext";

export default function EmployeeCard({ employee }) {
  const { bookmarks, toggleBookmark } = useDashboard();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition text-black">
      <h2 className="text-xl font-semibold text-black">{employee.name}</h2>
      <p>Performance Score: {employee.score}</p>
      <button
        onClick={() => toggleBookmark(employee.id)}
        className={`mt-2 inline-block text-sm font-medium ${
          bookmarks.includes(employee.id)
            ? "text-red-500"
            : "text-blue-500 hover:underline"
        }`}
      >
        {bookmarks.includes(employee.id) ? "Remove Bookmark" : "Bookmark"}
      </button>
    </div>
  );
}
