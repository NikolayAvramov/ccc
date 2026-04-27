"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

type Car = {
  id: string;
  make: string;
  model: string;
  type: string;
  year: string;
  price: string;
  mileage: string;
  location: string;
  description: string;
  images: string[];
  owner: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
};

type Conversation = {
  id: string;
};

// ✅ fetch user
async function fetchCurrentUser(): Promise<User> {
  const res = await fetch("/api/user", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// 🔥 ВАЖНО: само carId
async function createConversation(carId: string): Promise<Conversation> {
  const res = await fetch("/api/conversations", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carId }),
  });

  if (!res.ok) throw new Error("Failed to create conversation");
  return res.json();
}

export default function Details() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: car, isLoading } = useQuery<Car>({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await fetch(`/api/cars/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: !!id,
  });

  const { data: user } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    enabled: true,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ✅ mutation (без receiverId)
  const conversationMutation = useMutation({
    mutationFn: (carId: string) => createConversation(carId),

    onSuccess: (data) => {
      // 👉 отваря директно messages tab
      router.push(`/profile?tab=messages&conversation=${data.id}`);
    },

    onError: (error: any) => {
      alert("Failed to create conversation: " + error.message);
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10">Car not found</p>;

  const images =
    car.images?.length > 0
      ? car.images
      : ["https://via.placeholder.com/600x400?text=No+Image"];

  const mainImage = selectedImage || images[0];

  const isOwner = user?.id === car.owner;
  const isAuthenticated = !!user;

  // ✅ правилен handler
  const handleContactSeller = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    conversationMutation.mutate(car.id);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-10">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-8">
        {car.make} {car.model}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* IMAGES */}
        <div>
          <div className="w-full aspect-[16/9] rounded-xl shadow bg-black overflow-hidden">
            <img
              src={mainImage}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/600x400?text=No+Image";
              }}
            />
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-16 cursor-pointer border-2 ${
                  mainImage === img ? "border-orange-500" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-100 p-6 rounded-xl space-y-2">
            <p>
              <strong>Type:</strong> {car.type}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Price:</strong> {car.price} €
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage} km
            </p>
            <p>
              <strong>Location:</strong> {car.location}
            </p>
          </div>

          {/* ACTION */}
          {isAuthenticated && !isOwner && (
            <button
              onClick={handleContactSeller}
              disabled={conversationMutation.isPending}
              className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {conversationMutation.isPending
                ? "Starting chat..."
                : "Contact Seller"}
            </button>
          )}

          {/* NOT AUTHENTICATED MESSAGE */}
          {!isAuthenticated && (
            <div className="bg-blue-50 border-2 border-blue-500 p-6 rounded-xl text-center">
              <p className="text-gray-700 mb-3">
                👤 <strong>Want to contact the seller?</strong>
              </p>
              <p className="text-gray-600 mb-4 text-sm">
                Log in to your account to start a conversation with the owner.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-semibold"
              >
                Log In Now
              </button>
            </div>
          )}

          {/* OWNER MESSAGE */}
          {isOwner && (
            <div className="bg-green-50 border-2 border-green-500 p-6 rounded-xl text-center">
              <p className="text-green-700">
                ✓ <strong>This is your car listing</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10 bg-gray-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-3">Description</h2>
        <p>{car.description}</p>
      </div>
    </div>
  );
}
