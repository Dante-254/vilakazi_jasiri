"use client";
import { ReactNode, useState } from "react";

export function Protected({ children }: { children: ReactNode }) {
  // Mock auth state — replace with real auth integration later
  const [isMember] = useState(false);

  if (!isMember) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-xl font-semibold">Members Only</h2>
        <p className="mt-2 text-gray-600">
          Access restricted. Please request verification from a Jasiri Scout
          Leader (JSL).
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default Protected;
