"use client";
import Link from "next/link";
import StarRating from "./StarRating";

export default function UserCard({ user }) {
  return (
    <div className="border p-4 rounded shadow ">
      <h2 className="font-semibold text-lg text-black">{user.firstName} {user.lastName}</h2>
      <p className="text-black">{user.email}</p>
      <p className="text-black">Age: {user.age}</p>
      <p className="text-sm text-gray-600 text-black">Dept: {user.department}</p>
      <StarRating rating={user.performance} />
      <div className="mt-2 flex gap-2 text-black">
        <Link href={`/employee/${user.id}`} className="text-blue-500 hover:underline">View</Link>
        <button className="text-yellow-600 hover:underline">Bookmark</button>
        <button className="text-green-600 hover:underline">Promote</button>
      </div>
    </div>
  );
}
