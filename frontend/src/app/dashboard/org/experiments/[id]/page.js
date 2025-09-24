"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/utils/api";

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await API.get(`/org/experiences/${id}`);
        setExperience(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExperience();
  }, [id]);

  if (!experience) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{experience.title}</h1>
      <p className="mt-2">{experience.description}</p>
      {experience.documents?.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold">Documents:</h2>
          <ul>
            {experience.documents.map((doc, idx) => (
              <li key={idx}>
                <a href={`http://localhost:4000/uploads/${doc}`} target="_blank" className="text-blue-600 underline">
                  {doc}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
