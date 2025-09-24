"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children, allow = ["student", "organisation"] }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (!loading && user && !allow.includes(user.role)) {
      // Redirect by role if not allowed
      router.push(user.role === "organisation" ? "/dashboard/org" : "/dashboard/student");
    }
  }, [user, loading, router, allow]);

  if (loading) return null;
  return user && allow.includes(user.role) ? children : null;
}
