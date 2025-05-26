"use client";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDashboard } from "../context/DashboardContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function Chart() {
  const { employees } = useDashboard();

  const data = {
    labels: employees.map((e) => e.name),
    datasets: [
      {
        label: "Performance Score",
        data: employees.map((e) => e.score),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar data={data} />
    </div>
  );
}
