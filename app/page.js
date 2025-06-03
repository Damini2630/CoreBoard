
"use client";
import { useDashboard } from "../context/DashboardContext";
import UserCard from "../components/UserCard";
import SearchFilter from "../components/SearchFilter";

export default function HomePage() {
  const { filteredUsers } = useDashboard();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-black">HR Performance Dashboard</h1>
      <SearchFilter />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
