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
    <div className="min-h-screen flex justify-center items-center">
      <form className="p-6 border rounded" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 w-full rounded" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
