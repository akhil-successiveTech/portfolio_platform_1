"use client";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import PrivateRoute from "@/components/PrivateRoute";

export default function StudentPage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/student/experiences");
        setExperiences(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const act = async (id, action) => {
    try {
      await API.post(`/student/experiences/${id}/${action}`);
      setExperiences((prev) => prev.map((e) => (e._id === id ? { ...e, status: action === "accept" ? "accepted" : "declined" } : e)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PrivateRoute allow={["student"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Experiences</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : experiences.length === 0 ? (
            <p className="text-gray-500">No experiences yet.</p>
          ) : (
            <ul className="space-y-2 mt-2">
              {experiences.map((exp) => (
                <li key={exp._id} className="border rounded p-3 bg-white shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                      <p className="text-xs mt-1 capitalize">Status: {exp.status}</p>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => act(exp._id, "accept")} className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                        Accept
                      </button>
                      <button onClick={() => act(exp._id, "decline")} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                </li)
              ))}
            </ul>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
