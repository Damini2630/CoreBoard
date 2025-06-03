// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function SidebarLayout({ children }) {
//   const path = usePathname();

//   const navItems = [
//     { href: "/", label: "Dashboard" },
//     { href: "/bookmarks", label: "Bookmarks" },
//     { href: "/analytics", label: "Analytics" },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
//         <h2 className="text-xl font-bold mb-6">CoreBoard</h2>
//         {navItems.map(({ href, label }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`block py-2 px-3 rounded ${
//               path === href ? "bg-gray-700" : "hover:bg-gray-700"
//             }`}
//           >
//             {label}
//           </Link>
//         ))}
//       </aside>
//       <main className="flex-1 bg-gray-50">{children}</main>
//     </div>
//   );
// }




"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InsightsIcon from "@mui/icons-material/Insights";

const drawerWidth = 240;

const navItems = [
  { href: "/", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/bookmarks", label: "Bookmarks", icon: <BookmarkIcon /> },
  { href: "/analytics", label: "Analytics", icon: <InsightsIcon /> },
];

export default function SidebarLayout({ children }) {
  const path = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            backgroundColor: "#1f2937", // Tailwind gray-800 equivalent
            color: "#fff",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "center", mt: 2 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ fontFamily: '"Segoe UI", sans-serif' }}
          >
            CoreBoard
          </Typography>
        </Toolbar>

        <List sx={{ mt: 2 }}>
          {navItems.map(({ href, label, icon }) => (
            <Link key={href} href={href} passHref legacyBehavior>
              <ListItem
                button
                component="a"
                sx={{
                  color: path === href ? "#fff" : "#cbd5e1",
                  bgcolor: path === href ? "#374151" : "transparent", // gray-700 on active
                  "&:hover": {
                    bgcolor: "#4b5563", // gray-600
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb", // gray-50
          minHeight: "100vh",
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

