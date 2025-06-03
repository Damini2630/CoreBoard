"use client";
import Link from "next/link";
import { useDashboard } from "../context/DashboardContext";
import StarRating from "./StarRating";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function UserCard({ user }) {
  const {
    toggleBookmark,
    promoteEmployee,
    bookmarks,
    promoted,
  } = useDashboard();

  const isBookmarked = bookmarks.includes(user.id);
  const isPromoted = promoted.includes(user.id);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleBookmark = () => {
    toggleBookmark(user.id);
    toast[isBookmarked ? "info" : "success"](
      `${user.firstName} ${user.lastName} ${isBookmarked ? "removed from" : "added to"} bookmarks`
    );
  };

  const handlePromoteConfirm = () => {
    if (!isPromoted) {
      setOpenConfirm(true);
    }
  };

  const handlePromote = () => {
    promoteEmployee(user.id);
    toast.success(`${user.firstName} ${user.lastName} has been promoted!`);
    setOpenConfirm(false);
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div" color="text.primary">
            {user.firstName} {user.lastName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Age: {user.age}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Department: {user.department}
          </Typography>

          <StarRating rating={user.performance} />

          <Stack direction="row" spacing={1} mt={2} alignItems="center">
            <Link href={`/employee/${user.id}`} passHref legacyBehavior>
              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                size="small"
              >
                View
              </Button>
            </Link>

            <Tooltip title={isBookmarked ? "Remove Bookmark" : "Bookmark"}>
              <IconButton
                color={isBookmarked ? "warning" : "default"}
                onClick={handleBookmark}
              >
                {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title={isPromoted ? "Already Promoted" : "Promote"}>
              <IconButton
                color={isPromoted ? "success" : "default"}
                onClick={handlePromoteConfirm}
              >
                <EmojiEventsIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>

      {/* Confirm Dialog for Promotion */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="promote-dialog-title"
        aria-describedby="promote-dialog-description"
      >
        <DialogTitle id="promote-dialog-title">
          Confirm Promotion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="promote-dialog-description">
            Are you sure you want to promote {user.firstName} {user.lastName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handlePromote} color="success" autoFocus>
            Promote
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
