"use client";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import PrivateRoute from "@/components/PrivateRoute";

export default function OrgPage() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/org/experiences");
      setExperiences(res.data);
    };
    fetchData();
  }, []);

  return (
    <PrivateRoute allow={["organisation"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Organisation Dashboard</h1>

        <a
          href="/dashboard/org/experiments/add"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add New Experience
        </a>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Experiences</h2>
          {experiences.length === 0 ? (
            <p className="text-gray-500">No experiences yet.</p>
          ) : (
            <ul className="space-y-2 mt-2">
              {experiences.map((exp) => (
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
    </PrivateRoute>
  );
}
