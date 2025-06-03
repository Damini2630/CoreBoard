// "use client";
// import { Bar, Pie } from "react-chartjs-2";
// import { useDashboard } from "../../context/DashboardContext";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   ArcElement,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, ArcElement, Legend);

// export default function AnalyticsPage() {
//   const { users, bookmarks } = useDashboard();

//   // ✅ Prevent render until data is available
//   if (!users || !bookmarks) {
//     return <div className="p-6 text-black">Loading analytics...</div>;
//   }

//   const departments = ["HR", "Engineering", "Marketing", "Finance"];
//   const departmentData = departments.map((dept) => {
//     const deptUsers = users.filter((u) => u.department === dept);
//     const avg = deptUsers.length
//       ? deptUsers.reduce((sum, u) => sum + u.performance, 0) / deptUsers.length
//       : 0;
//     return { dept, avg: avg.toFixed(1) };
//   });

//   const departmentChart = {
//     labels: departmentData.map((d) => d.dept),
//     datasets: [
//       {
//         label: "Avg Performance",
//         data: departmentData.map((d) => d.avg),
//         backgroundColor: "#3b82f6",
//       },
//     ],
//   };

//   const bookmarkChart = {
//     labels: ["Bookmarked", "Not Bookmarked"],
//     datasets: [
//       {
//         label: "Bookmark Stats",
//         data: [bookmarks.length, users.length - bookmarks.length],
//         backgroundColor: ["#10b981", "#f87171"],
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-black">Analytics</h1>

//       <div className="bg-white p-4 rounded shadow text-black h-96">
//         <h2 className="text-xl font-semibold mb-2">Avg Rating by Department</h2>
//         <div className="h-full">
//           <Bar data={departmentChart} options={chartOptions} />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded shadow h-96">
//         <h2 className="text-xl font-semibold mb-2">Bookmark Distribution</h2>
//         <div className="h-full">
//           <Pie data={bookmarkChart} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }


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
  const { users, bookmarks, promoted } = useDashboard();

  if (!users || !bookmarks || !promoted) {
    return <div className="p-6 text-black">Loading analytics...</div>;
  }

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

  const promotedChart = {
    labels: ["Promoted", "Not Promoted"],
    datasets: [
      {
        label: "Promotion Stats",
        data: [promoted.length, users.length - promoted.length],
        backgroundColor: ["#6366f1", "#e5e7eb"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-black">Analytics</h1>

      <div className="bg-white p-4 rounded shadow text-black h-96">
        <h2 className="text-xl font-semibold mb-2">Avg Rating by Department</h2>
        <div className="h-full">
          <Bar data={departmentChart} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow h-96">
        <h2 className="text-xl font-semibold mb-2">Bookmark Distribution</h2>
        <div className="h-full">
          <Pie data={bookmarkChart} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow h-96">
        <h2 className="text-xl font-semibold mb-2">Promotion Distribution</h2>
        <div className="h-full">
          <Pie data={promotedChart} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
