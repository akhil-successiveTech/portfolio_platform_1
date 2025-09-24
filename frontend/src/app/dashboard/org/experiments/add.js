"use client";
import { useState } from "react";
import API from "@/utils/api";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function AddExperiencePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/org/experiences", form);
      router.push("/dashboard/org/experiments");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute allow={["organisation"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Experience</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </PrivateRoute>
  );
}
