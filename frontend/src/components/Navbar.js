"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">Portfolio Platform</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4 inline-flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs bg-gray-700 capitalize">{user.role}</span>
              <span className="text-sm opacity-80">{user.id?.slice(0, 6)}...</span>
            </span>
            <button onClick={logoutUser} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="mr-4">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
