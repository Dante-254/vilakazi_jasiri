"use client";
import { useEffect } from "react";

export default function Lightbox({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="max-w-[90%] max-h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          className="w-full h-auto rounded-md shadow-lg object-contain"
          alt="lightbox"
        />
        <button
          onClick={onClose}
          className="mt-2 px-3 py-2 bg-white text-black rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
