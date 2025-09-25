"use client";
import { useState, useContext } from "react";
import API from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      loginUser(res.data.token);
      // Decode is handled in context. Redirect by role:
      const { role } = JSON.parse(atob(res.data.token.split(".")[1]));
      if (role === "organisation") router.push("/dashboard/org");
      else router.push("/dashboard/student");
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <form className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Welcome back</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition text-white p-2.5 w-full rounded-md shadow-sm" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <p className="text-sm text-slate-600 text-center">
            No account? <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
