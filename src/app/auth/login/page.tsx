"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: mock account verification by a JSL
    setMessage(
      "Your request has been submitted — an advisor must verify your account."
    );
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold">Members Login</h1>
      <p className="mt-2 text-sm text-gray-600">
        Members-only login. Accounts must be verified by a Jasiri Scout Leader
        (JSL).
      </p>

      <form onSubmit={submit} className="mt-6 grid gap-3">
        <input
          className="p-3 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your crew email"
        />
        <input
          className="p-3 border rounded-md"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Invite / verification code (if any)"
        />
        <button className="px-4 py-2 bg-green-700 text-white rounded-md">
          Request Access
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-neutral-100 rounded-md">{message}</div>
      )}
    </div>
  );
}
