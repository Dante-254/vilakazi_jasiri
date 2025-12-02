import { notFound } from "next/navigation";
import PATROLS from "../../../data/patrols";

interface Props {
  params: { patrol: string };
}

export default function PatrolPage({ params }: Props) {
  const id = params.patrol;
  const patrol = PATROLS.find((p) => p.id === id);
  if (!patrol) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center"
          style={{ border: `4px solid ${patrol.color}` }}
        >
          {patrol.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{patrol.name}</h1>
          <div className="text-sm text-gray-600 dark:text-neutral-400">
            {patrol.status}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">About this patrol</h2>
        <p className="mt-2 text-gray-700 dark:text-neutral-300">
          {patrol.description}
        </p>
      </div>
    </div>
  );
}
