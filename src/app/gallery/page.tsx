import MasonryGallery from "../../components/ui/MasonryGallery";

const SAMPLE = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-3 text-gray-600 dark:text-neutral-300">
        Gallery with responsive masonry and lightbox.
      </p>
      <div className="mt-6">
        <MasonryGallery images={SAMPLE} />
      </div>
    </div>
  );
}
