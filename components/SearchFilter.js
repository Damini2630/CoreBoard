"use client";
import { useDashboard } from "../context/DashboardContext";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";

const departments = ["HR", "Engineering", "Marketing", "Finance"];
const ratings = [1, 2, 3, 4, 5];

export default function SearchFilter() {
  const { setSearch, setFilters } = useDashboard();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleDepartmentChange = (event, newDepartments) => {
    setSelectedDepartments(newDepartments);
    setFilters((prev) => ({ ...prev, department: newDepartments }));
  };

  const handleRatingChange = (event, newRatings) => {
    setSelectedRatings(newRatings);
    setFilters((prev) => ({ ...prev, rating: newRatings }));
  };

  return (
    <Box my={2} sx={{ overflowX: "auto" }}>
      <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap">
        {/* Search Input */}
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 250 }}
        />

        {/* Departments */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Departments:
          </Typography>
          <ToggleButtonGroup
            value={selectedDepartments}
            onChange={handleDepartmentChange}
            aria-label="department filter"
            size="small"
          >
            {departments.map((dept) => (
              <ToggleButton key={dept} value={dept} aria-label={dept}>
                {dept}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Ratings */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Ratings:
          </Typography>
          <ToggleButtonGroup
            value={selectedRatings}
            onChange={handleRatingChange}
            aria-label="rating filter"
            size="small"
          >
            {ratings.map((rating) => (
              <ToggleButton key={rating} value={rating} aria-label={`rating-${rating}`}>
                {rating}⭐
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Stack>
    </Box>
  );
}
