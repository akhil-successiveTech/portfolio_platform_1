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
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="p-6 border rounded" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={handleChange}
        />
        <select
          name="role"
          className="border p-2 mb-3 w-full"
          value={form.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="organisation">Organisation</option>
        </select>
        <button className="bg-green-600 hover:bg-green-700 transition text-white p-2 w-full rounded" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
