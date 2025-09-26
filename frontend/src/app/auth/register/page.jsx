"use client";
import { useState } from "react";
import API from "../../../utils/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // "student" or "organisation" to match backend
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!["student", "organisation"].includes(form.role)) {
      setError("Invalid role selected");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/register", form);
      router.push("/auth/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
      console.log("Form details submitted:", form);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <form className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Create your account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded w-full p-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded w-full p-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded w-full p-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Role</label>
            <select
              name="role"
              className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded w-full p-2"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="organisation">Organisation</option>
            </select>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="bg-green-600 hover:bg-green-700 active:scale-[0.99] transition text-white p-2.5 w-full rounded-md shadow-sm" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm text-slate-600 text-center">
            Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
