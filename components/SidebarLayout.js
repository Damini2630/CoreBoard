"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout({ children }) {
  const path = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/bookmarks", label: "Bookmarks" },
    { href: "/analytics", label: "Analytics" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">CoreBoard</h2>
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block py-2 px-3 rounded ${
              path === href ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
