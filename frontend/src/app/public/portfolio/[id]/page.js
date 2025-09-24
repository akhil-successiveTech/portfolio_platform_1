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
      <h1 className="text-3xl font-bold">Public Portfolio</h1>
      {portfolio.experiences?.length ? (
        <div className="mt-4 space-y-4">
          {portfolio.experiences.map((exp) => (
            <ExperienceCard key={exp._id} data={exp} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No accepted experiences yet.</p>
      )}
    </div>
  );
}
