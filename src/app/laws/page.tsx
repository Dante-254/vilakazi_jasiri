import KSA_LAWS from "../../data/laws";

export default function LawsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Kenya Scouts Laws & Structure</h1>
      <div className="mt-6 grid gap-4">
        {KSA_LAWS.map((law, idx) => (
          <details key={idx} className="p-4 border rounded-md">
            <summary className="font-semibold">{law.title}</summary>
            <p className="mt-2 text-gray-600">{law.text}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
