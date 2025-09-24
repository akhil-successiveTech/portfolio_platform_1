"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Portfolio Platform</h1>
      <nav className="flex gap-4">
        <Link href="./dashboard/org">Organization Dashboard</Link>
        <Link href="./dashboard/student">Student Dashboard</Link>
        <Link href="./dashboard/experiments">Experiments</Link>
      </nav>
    </main>
  );
}