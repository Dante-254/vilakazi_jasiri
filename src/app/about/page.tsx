export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">About Villakazi Jasiri</h1>
      <p className="mt-4 text-gray-700 dark:text-neutral-300">A brief history and mission of the crew. (Placeholder)</p>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">History</h2>
        <p className="mt-2 text-gray-600">Timeline component and parallax sections planned here.</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Our Ideals</h2>
        <ul className="mt-3 list-disc list-inside text-gray-700 dark:text-neutral-300">
          <li>Service to community</li>
          <li>Leadership and discipline</li>
          <li>Adventure and conservation</li>
        </ul>
      </section>
    </div>
  );
}
