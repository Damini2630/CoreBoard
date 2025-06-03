"use client";
import Link from "next/link";
import StarRating from "./StarRating";
import { useDashboard } from "../context/DashboardContext";
import { FaBookmark, FaRegBookmark, FaUserTie } from "react-icons/fa"; // Optional icons

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
    <div className="border p-4 rounded shadow bg-white flex flex-col gap-2">
      <h2 className="font-semibold text-lg text-black">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-black">{user.email}</p>
      <p className="text-black">Age: {user.age}</p>
      <p className="text-sm text-gray-600">Dept: {user.department}</p>
      <StarRating rating={user.performance} />

      <div className="mt-3 flex gap-4 items-center text-sm">
        <Link
          href={`/employee/${user.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          View
        </Link>

        <button
          onClick={() => toggleBookmark(user.id)}
          className="flex items-center gap-1 text-yellow-600 hover:underline"
        >
          {isBookmarked ? (
            <>
              <FaBookmark className="text-yellow-700" />
              <span className="text-yellow-700">Bookmarked</span>
            </>
          ) : (
            <>
              <FaRegBookmark />
              <span>Bookmark</span>
            </>
          )}
        </button>

        <button
          onClick={() => promoteEmployee(user.id)}
          className="flex items-center gap-1 text-green-600 hover:underline"
        >
          <FaUserTie className={isPromoted ? "text-green-700" : ""} />
          <span className={isPromoted ? "text-green-700 font-medium" : ""}>
            {isPromoted ? "Promoted" : "Promote"}
          </span>
        </button>
      </div>
    </div>
  );
}
