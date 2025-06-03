


"use client";
import React from "react";
import Link from "next/link";
import { useDashboard } from "../../context/DashboardContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI Components
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Stack,
} from "@mui/material";

export default function BookmarksPage() {
  const { users, bookmarks, toggleBookmark, promoteEmployee, promoted } = useDashboard();

  const handlePromote = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to promote ${name}?`);
    if (confirmed) {
      promoteEmployee(id);
      toast.success(`${name} has been promoted!`, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  };

  const handleUnbookmark = (id, name) => {
    toggleBookmark(id);
    toast.info(`${name} removed from bookmarks.`, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
    });
  };

  const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));

  if (bookmarkedUsers.length === 0) {
    return (
      <Box p={4}>
        <Typography variant="body1" color="text.secondary">
          No bookmarks found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <ToastContainer />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bookmarked Employees
      </Typography>

      <Grid container spacing={3}>
        {bookmarkedUsers.map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email} | Dept: {user.department}
                </Typography>
              </CardContent>

              <CardActions>
                <Stack direction="row" spacing={1}>
                  <Link href={`/employee/${user.id}`} passHref legacyBehavior>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </Link>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleUnbookmark(user.id, `${user.firstName} ${user.lastName}`)}
                  >
                    Remove Bookmark
                  </Button>

                  <Button
                    size="small"
                    color="success"
                    onClick={() => handlePromote(user.id, `${user.firstName} ${user.lastName}`)}
                  >
                    {promoted.includes(user.id) ? "Promoted ✅" : "Promote"}
                  </Button>

                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


