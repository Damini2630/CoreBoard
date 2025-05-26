"use client";
import { Bar, Pie } from "react-chartjs-2";
import { useDashboard } from "../../context/DashboardContext";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, ArcElement, Legend);

export default function AnalyticsPage() {
  const { users, bookmarks } = useDashboard();

  const departments = ["HR", "Engineering", "Marketing", "Finance"];
  const departmentData = departments.map((dept) => {
    const deptUsers = users.filter((u) => u.department === dept);
    const avg = deptUsers.length
      ? deptUsers.reduce((sum, u) => sum + u.performance, 0) / deptUsers.length
      : 0;
    return { dept, avg: avg.toFixed(1) };
  });

  const departmentChart = {
    labels: departmentData.map((d) => d.dept),
    datasets: [
      {
        label: "Avg Performance",
        data: departmentData.map((d) => d.avg),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const bookmarkChart = {
    labels: ["Bookmarked", "Not Bookmarked"],
    datasets: [
      {
        label: "Bookmark Stats",
        data: [bookmarks.length, users.length - bookmarks.length],
        backgroundColor: ["#10b981", "#f87171"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-black">Analytics</h1>

      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="text-xl font-semibold mb-2">Avg Rating by Department</h2>
        <Bar data={departmentChart} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Bookmark Distribution</h2>
        <Pie data={bookmarkChart} />
      </div>
    </div>
  );
}
