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
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
              onClick={() => toggleBookmark(user.id)}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isPromoted ? "Already Promoted" : "Promote"}>
            <IconButton
              color={isPromoted ? "success" : "default"}
              onClick={() => promoteEmployee(user.id)}
            >
              <EmojiEventsIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
}
