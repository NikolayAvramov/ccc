"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/services/carsServices";
import Card from "../components/Card";

// 🔥 fetch function

export default function Showroom() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🔥 React Query
  const {
    data: cars = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  // 🔁 debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // 🔍 filter
  const filteredCars = cars.filter((car: any) => {
    const s = debouncedSearch.toLowerCase();

    return (
      car.make.toLowerCase().includes(s) ||
      car.model.toLowerCase().includes(s) ||
      car.description.toLowerCase().includes(s) ||
      car.year.toString().includes(debouncedSearch) ||
      car.location.toLowerCase().includes(s)
    );
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/road-forest_1127-3079.jpg')",
      }}
    >
      <div className="min-h-screen bg-black/70 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">
              Classic Car Showroom
            </h1>

            <p className="text-orange-300 uppercase tracking-widest mb-10">
              Discover extraordinary automobiles from history
            </p>

            {/* SEARCH */}
            <div className="flex justify-center">
              <div className="relative w-[480px] max-w-full">
                <input
                  type="text"
                  placeholder="Search by make, model, year, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 pr-12 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-lg focus:outline-none focus:ring-4 focus:ring-orange-300/20 focus:border-orange-400 transition"
                />

                {/* ICON */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                  🔍
                </span>

                {/* CLEAR */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-orange-400 text-white hover:text-black transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <p className="mt-3 text-xs tracking-widest uppercase text-white/40">
              Try: Ferrari, 1967, Italy
            </p>

            <div className="mt-4">
              <span className="bg-white/10 px-4 py-2 rounded-full text-white/80 text-sm">
                {filteredCars.length}{" "}
                {filteredCars.length === 1 ? "vehicle" : "vehicles"} available
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            {isLoading ? (
              <div className="text-center text-white">Loading...</div>
            ) : isError ? (
              <div className="text-center text-red-500">Error loading cars</div>
            ) : filteredCars.length ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
                {filteredCars.map((car: any) => (
                  <Card key={car.id} info={car} />
                ))}
              </div>
            ) : (
              <div className="text-center p-16 bg-white/10 rounded-xl">
                <div className="text-5xl mb-3">🚗</div>
                <h3 className="text-white text-xl mb-2">No cars found</h3>
                <p className="text-white/70">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
