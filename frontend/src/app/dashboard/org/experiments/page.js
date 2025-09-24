"use client";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import Link from "next/link";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Experiences</h1>
      <Link href="/org/experiments/add" className="bg-blue-600 text-white px-4 py-2 rounded">
        ➕ Add Experience
      </Link>

      <div className="mt-6 space-y-4">
        {experiments.map((exp) => (
          <div key={exp._id} className="card">
            <h2 className="font-semibold text-lg">{exp.title}</h2>
            <p>{exp.description}</p>
            <Link href={`/org/experiments/${exp._id}`} className="text-blue-600 underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
