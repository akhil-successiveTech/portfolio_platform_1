"use client";
import { useEffect, useState } from "react";
import API from "@/utils/api";

export default function StudentPage() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/student/portfolio");
      setPortfolio(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Portfolio</h2>
        {portfolio.length === 0 ? (
          <p className="text-gray-500">No experiences yet.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {portfolio.map((exp) => (
              <li
                key={exp._id}
                className="border rounded p-3 bg-white shadow-sm"
              >
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
