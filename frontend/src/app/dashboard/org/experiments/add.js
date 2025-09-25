"use client";
import { useState } from "react";
import API from "@/utils/api";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function AddExperiencePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", studentId: "", startDate: "", endDate: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!form.title || !form.description || !form.studentId) {
      setError("Title, description, and student ID are required");
      setLoading(false);
      return;
    }

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
          <input
            type="text"
            placeholder="Student ID"
            className="border p-2 w-full rounded"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                className="border p-2 w-full rounded"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                className="border p-2 w-full rounded"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>
    </PrivateRoute>
  );
}
