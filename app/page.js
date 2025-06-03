
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
  variant="h3"
  fontWeight="bold"
  sx={{
    color: "primary.main",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    mb: 2,
    borderBottom: "3px solid",
    borderColor: "primary.light",
    display: "inline-block",
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
