"use client";
import { useDashboard } from "../context/DashboardContext";

const departments = ["HR", "Engineering", "Marketing", "Finance"];
const ratings = [1, 2, 3, 4, 5];

export default function SearchFilter() {
  const { setSearch, setFilters } = useDashboard();

  const handleFilter = (e, type) => {
    const value = parseInt(e.target.value || e.target.dataset.value);
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center text-black">
      <input
        type="text"
        placeholder="Search by name, email, dept..."
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />
      <div>
        <label className="font-medium mr-2 text-black">Departments:</label>
        {departments.map((d) => (
          <button key={d} onClick={(e) => handleFilter({ target: { value: d } }, "department")}
            className="text-sm px-2 py-1 border rounded mr-1 hover:bg-gray-100 text-black">{d}</button>
        ))}
      </div>
      <div>
        <label className="font-medium mr-2 text-black">Rating:</label>
        {ratings.map((r) => (
          <button key={r} onClick={(e) => handleFilter({ target: { value: r } }, "rating")}
            className="text-sm px-2 py-1 border rounded mr-1 hover:bg-gray-100 text-black">{r}⭐</button>
        ))}
      </div>
    </div>
  );
}
