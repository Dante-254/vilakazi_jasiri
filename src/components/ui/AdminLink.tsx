"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLink() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data && data.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;

  if (user) {
    return (
      <div className="mt-2 md:mt-0">
        <Link
          href="/admin"
          className="text-sm bg-green-600 text-white px-3 py-1 rounded"
        >
          Admin Panel
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-2 md:mt-0">
      <Link
        href="/admin/login"
        className="text-sm text-gray-700 dark:text-neutral-300"
      >
        Admin Login
      </Link>
    </div>
  );
}
