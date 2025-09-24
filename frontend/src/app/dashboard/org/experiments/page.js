"use client";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const res = await API.get("/org/experiences");
        setExperiments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExperiments();
  }, []);

  return (
    <PrivateRoute allow={["organisation"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Student Experiences</h1>
        <Link href="/dashboard/org/experiments/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add Experience
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((exp) => (
            <div key={exp._id} className="border rounded p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{exp.title}</h2>
                  <p className="text-gray-600 text-sm">{exp.description}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-gray-100 capitalize">{exp.status}</span>
              </div>
              <Link href={`/dashboard/org/experiments/${exp._id}`} className="text-blue-600 underline mt-2 inline-block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
}
