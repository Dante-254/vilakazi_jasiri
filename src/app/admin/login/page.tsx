"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Login failed");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={submit}>
          <label className="block text-sm">Email</label>
          <input
            className="w-full border rounded px-3 py-2 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
