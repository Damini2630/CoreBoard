"use client";
import { useState } from "react";

const tabData = {
  Overview: "Performance overview and goals...",
  Projects: "Worked on Project Alpha, Beta, and Gamma...",
  Feedback: "Manager feedback: Excellent team collaboration...",
};

export default function Tabs() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="mt-6">
      <div className="flex gap-4 border-b text-black">
        {Object.keys(tabData).map((tab) => (
          <button key={tab}
            onClick={() => setActive(tab)}
            className={`py-2 px-4 font-medium ${active === tab ? "border-b-2 border-blue-600" : "text-gray-500"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 text-gray-700">{tabData[active]}</div>
    </div>
  );
}
