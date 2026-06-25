"use client";

import { useRouter } from "next/navigation";

type Car = {
  id: string;
  make: string;
  model: string;
  price: string;
  year: string;
  description: string;
  images: string[];
};

export default function Card({ info }: { info: Car }) {
  const router = useRouter();

  function onDetailsClick() {
    router.push(`/showroom/${info.id}`);
  }

  function getImageUrl(imagePath: string) {
    if (!imagePath) {
      return "https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg";
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    return `http://localhost:3000/${imagePath}`;
  }

  return (
    <div
      onClick={onDetailsClick}
      className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition hover:-translate-y-2 hover:shadow-2xl relative"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={getImageUrl(info.images?.[0])}
          alt={`${info.make} ${info.model}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg";
          }}
          className="w-full h-[200px] object-cover transition group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {info.make} {info.model}
        </h3>

        <p className="text-orange-500 font-semibold text-lg">${info.price}</p>

        <p className="text-gray-500 text-sm mb-2">Година: {info.year}</p>

        <p className="text-gray-600 text-sm line-clamp-3">{info.description}</p>
      </div>

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-300/10 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
    </div>
  );
}
