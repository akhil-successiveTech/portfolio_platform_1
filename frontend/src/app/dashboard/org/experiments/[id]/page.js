"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/utils/api";
import PrivateRoute from "@/components/PrivateRoute";

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        // No endpoint exists for single fetch in backend routes; fall back to listing and filtering if needed
        const list = await API.get(`/org/experiences`);
        const found = list.data.find((e) => e._id === id);
        const res = { data: found };
        setExperience(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExperience();
  }, [id]);

  const uploadDoc = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await API.post(`/org/experiences/${id}/docs`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Refresh list
      const list = await API.get(`/org/experiences`);
      setExperience(list.data.find((e) => e._id === id));
    } catch (e2) {
      console.error(e2);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  if (!experience) return <p className="p-6">Loading...</p>;

  return (
    <PrivateRoute allow={["organisation"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">{experience.title}</h1>
        <p className="mt-2">{experience.description}</p>
        <p className="text-sm mt-1 capitalize">Status: {experience.status}</p>

        <form onSubmit={uploadDoc} className="mt-6 flex items-center gap-2">
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button className="px-3 py-2 bg-blue-600 text-white rounded" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </form>

        {experience.documents?.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold">Documents:</h2>
            <ul className="list-disc ml-5">
              {experience.documents.map((doc) => (
                <li key={doc._id || doc} className="text-sm">
                  {doc.filename || doc}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
