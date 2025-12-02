export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-gray-600">Reach out to the crew.</p>

      <div className="mt-6">
        <form className="grid gap-3">
          <input className="p-3 border rounded-md" placeholder="Your name" />
          <input className="p-3 border rounded-md" placeholder="Your email" />
          <textarea
            className="p-3 border rounded-md"
            placeholder="Message"
            rows={5}
          />
          <button className="px-4 py-2 bg-green-700 text-white rounded-md">
            Send
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <div>Email: villakazijasiriscouts@gmail.com</div>
          <div>Location: Kasarani Sub-County, Nairobi</div>
          <div>WhatsApp: placeholder</div>
        </div>
      </div>
    </div>
  );
}
