"use client";
import { motion } from "framer-motion";

export default function PatrolMembersClient({ patrol }: { patrol: any }) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-4 border rounded-md"
        >
          <div className="font-semibold">Patrol Leader</div>
          <div className="mt-2">{patrol.pl?.name}</div>
        </motion.div>

        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-4 border rounded-md"
        >
          <div className="font-semibold">Assistant Patrol Leader</div>
          <div className="mt-2">{patrol.apl?.name}</div>
        </motion.div>
      </div>

      <div className="mt-6">
        <div className="font-semibold">Members</div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {patrol.members?.map((m: any, i: number) => (
            <motion.div
              key={i}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-3 border rounded-md"
            >
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-gray-600">{m.role}</div>
              <div className="text-xs mt-1 text-gray-500">{m.duty}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
