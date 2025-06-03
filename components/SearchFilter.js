"use client";
import { useDashboard } from "../context/DashboardContext";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
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
    <Box my={3} width="100%">
      <Grid container spacing={3} alignItems="flex-start">
        {/* Search */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        {/* Departments */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Departments:
          </Typography>
          <ToggleButtonGroup
            value={selectedDepartments}
            onChange={handleDepartmentChange}
            aria-label="department filter"
            size="small"
            fullWidth
          >
            {departments.map((dept) => (
              <ToggleButton key={dept} value={dept}>
                {dept}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        {/* Ratings */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" gutterBottom>
            Ratings:
          </Typography>
          <ToggleButtonGroup
            value={selectedRatings}
            onChange={handleRatingChange}
            aria-label="rating filter"
            size="small"
            fullWidth
          >
            {ratings.map((rating) => (
              <ToggleButton key={rating} value={rating}>
                {rating}⭐
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
