
"use client";
import { useDashboard } from "../context/DashboardContext";
import UserCard from "../components/UserCard";
import SearchFilter from "../components/SearchFilter";
import { Typography } from "@mui/material";

export default function HomePage() {
  const { filteredUsers } = useDashboard();

  return (
    <div className="p-6 space-y-4">
      <Typography
  variant="h4"
  fontWeight={500}
  color="text.primary"
  sx={{
    mb: 2,
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    letterSpacing: 0.5,
  }}
>
  HR Performance Dashboard
</Typography>


      <SearchFilter />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
