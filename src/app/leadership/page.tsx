import LEADERS from "../../data/leadership";

export default function LeadershipPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Jasiri Scout Leaders (JSL)</h1>
      <p className="mt-2 text-gray-600">
        Advisors and crew council. Cards with pictures, roles, and bios.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {LEADERS.map((l) => (
          <div
            key={l.id}
            className="p-4 border rounded-md flex gap-4 items-center"
          >
            <div
              className="w-20 h-20 bg-neutral-100 rounded-md"
              style={{
                backgroundImage: `url(${l.image})`,
                backgroundSize: "cover",
              }}
            />
            <div>
              <div className="font-semibold">{l.name}</div>
              <div className="text-sm text-gray-600">{l.role}</div>
              <p className="mt-2 text-sm text-gray-700">{l.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
