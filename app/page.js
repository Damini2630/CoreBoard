"use client";
import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import UserCard from "../components/UserCard";
import SearchFilter from "../components/SearchFilter";
import {
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function HomePage() {
  const { filteredUsers, addEmployee } = useDashboard();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    department: "",
    phone: "",
    address: "",
    bio: "", // 👈 Add bio to state
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addEmployee(form);
    setOpen(false);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      department: "",
      phone: "",
      address: "",
      bio: "", // 👈 Reset bio too
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          fontWeight={500}
          color="text.primary"
          sx={{
            fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
            letterSpacing: 0.5,
          }}
        >
          HR Performance Dashboard
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add Employee
        </Button>
      </Box>

      <SearchFilter />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} mt={1}>
            {[
              "firstName",
              "lastName",
              "email",
              "age",
              "department",
              "phone",
              "address",
            ].map((field) => (
              <Grid item xs={12} sm={field === "address" ? 12 : 6} key={field}>
                <TextField
                  label={field.replace(/^\w/, (c) => c.toUpperCase())}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  fullWidth
                  type={field === "age" ? "number" : "text"}
                  required
                />
              </Grid>
            ))}

            {/* Bio Field */}
            <Grid item xs={12}>
              <TextField
                label="Bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                placeholder="Tell us a little about the employee..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!form.firstName || !form.email || !form.department}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
