"use client";
import { useState } from "react";
import Lightbox from "./Lightbox";

export default function MasonryGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
        {images.map((src, i) => (
          <div key={i} className="break-inside-avoid">
            <img
              src={src}
              alt={`img-${i}`}
              className="w-full rounded-md cursor-pointer"
              onClick={() => setOpen(src)}
            />
          </div>
        ))}
      </div>

      <Lightbox src={open} onClose={() => setOpen(null)} />
    </div>
  );
}
