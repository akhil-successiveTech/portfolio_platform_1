"use client";
import { useEffect, useState } from "react";
import API from "../../../../utils/api";
import ExperienceCard from "../../../../components/ExperienceCard";

export default function Portfolio({ params }) {
  const { id } = params;
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const res = await API.get(`/public/portfolio/${id}`);
      setPortfolio(res.data);
    };
    fetchPortfolio();
  }, [id]);

  if (!portfolio) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Public Portfolio</h1>
        {portfolio.experiences?.length ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.experiences.map((exp) => (
              <div key={exp._id} className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <p className="text-sm text-slate-700">{exp.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No accepted experiences yet.</p>
        )}
      </div>
    </div>
  );
}
