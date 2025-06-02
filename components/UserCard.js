"use client";
import Link from "next/link";
import StarRating from "./StarRating";
import { useDashboard } from "../context/DashboardContext";

export default function UserCard({ user }) {
  const {
    toggleBookmark,
    promoteEmployee,
    bookmarks,
    promoted,
  } = useDashboard();

  const isBookmarked = bookmarks.includes(user.id);
  const isPromoted = promoted.includes(user.id);

  return (
    <div className="border p-4 rounded shadow ">
      <h2 className="font-semibold text-lg text-black">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray">{user.email}</p>
      <p>Age: {user.age}</p>
      <p className="text-sm text-gray-600">Dept: {user.department}</p>
      <StarRating rating={user.performance} />

      <div className="mt-2 flex gap-4 items-center">
        <Link href={`/employee/${user.id}`} className="text-blue-500 hover:underline">
          View
        </Link>

        <button
          className={`hover:underline ${isBookmarked ? "text-yellow-700" : "text-yellow-600"}`}
          onClick={() => toggleBookmark(user.id)}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>

        <button
          className={`hover:underline ${isPromoted ? "text-green-700" : "text-green-600"}`}
          onClick={() => promoteEmployee(user.id)}
        >
          {isPromoted ? "Promoted" : "Promote"}
        </button>
      </div>
    </div>
  );
}
