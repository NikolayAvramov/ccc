"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/userServices";
import { fetchMyCars, deleteCarById } from "@/services/carsServices";
import { FaCar, FaPlus, FaEnvelope, FaCog } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Messages from "@/app/components/Messages";
import UpdateProfile from "@/app/components/UpdateProfile";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMessages, setShowMessages] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  // Auto-open messages if tab=messages in URL
  useEffect(() => {
    if (searchParams.get("tab") === "messages") {
      setShowMessages(true);
    }
  }, [searchParams]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const { data: cars = [], isLoading: carsLoading } = useQuery({
    queryKey: ["myCars"],
    queryFn: fetchMyCars,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCarById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCars"] });
    },
  });
  const handleDelete = (id: string) => {
    if (!confirm("Delete this car?")) return;
    deleteMutation.mutate(id);
  };
  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-[4.5rem]">
      {/* HERO */}
      <div className="relative h-[280px] w-full">
        <img
          src="https://w0.peakpx.com/wallpaper/249/741/HD-wallpaper-old-school-classic-fancy-low-rider-oldies-original.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

        <div className="relative z-10 flex items-end h-full max-w-6xl mx-auto px-4 pb-6">
          <div className="flex items-center gap-6">
            <img
              src={
                user.avatar
                  ? `http://localhost:3000/${user.avatar}`
                  : "/default-avatar.png"
              }
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <div className="text-white">
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="opacity-80">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        {/* INFO BAR */}
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Member since 2024</span>
            <span>Active seller</span>
            <span>Verified profile</span>
          </div>

          <button
            onClick={() => router.push("/add-car")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            <FaPlus />
            Add Car
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-2 gap-4 ">
          <button
            onClick={() => setShowMessages(true)}
            className="p-5 bg-white rounded-xl border hover:shadow-md hover:-translate-y-1 transition text-left"
          >
            <FaEnvelope className="text-orange-500 mb-3 text-lg" />
            <p className="font-semibold">Messages</p>
            <p className="text-sm text-gray-500">Check conversations</p>
          </button>

          <button
            onClick={() => setShowUpdateProfile(true)}
            className="p-5 bg-white rounded-xl border hover:shadow-md hover:-translate-y-1 transition text-left"
          >
            <FaCog className="text-orange-500 mb-3 text-lg" />
            <p className="font-semibold">Settings</p>
            <p className="text-sm text-gray-500">Profile & account</p>
          </button>
        </div>

        {/* MY CARS */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">My Cars</h2>
              <FaCar className="text-orange-500 mb-3 text-lg" />
            </div>

            <button
              onClick={() => router.push("/add-car")}
              className="text-orange-500 text-sm font-semibold hover:underline"
            >
              + Add new
            </button>
          </div>

          {carsLoading ? (
            <p className="text-gray-500">Loading cars...</p>
          ) : cars.length === 0 ? (
            <div className="border-2 border-dashed rounded-xl p-10 text-center">
              <p className="text-gray-500 mb-4">
                You haven’t listed any cars yet
              </p>
              <button
                onClick={() => router.push("/add-car")}
                className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Add your first car
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cars.map((car: any) => (
                <div
                  key={car.id}
                  className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition"
                >
                  {/* IMAGE */}
                  <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                    <img
                      src={
                        car.images?.[0] || "https://via.placeholder.com/400x300"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* PRICE OVERLAY */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      {car.price} €
                    </div>

                    {/* ACTIONS (hover) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                      <button
                        onClick={() => router.push(`/showroom/${car.id}`)}
                        className="px-3 py-1 bg-white text-sm rounded-md"
                      >
                        View
                      </button>

                      <button
                        onClick={() => router.push(`/edit/${car.id}`)}
                        className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">
                      {car.make} {car.model}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {car.year} • {car.mileage} km
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Modal */}
      {showMessages && <Messages onClose={() => setShowMessages(false)} />}

      {/* Update Profile Modal */}
      {showUpdateProfile && user && (
        <UpdateProfile
          user={user}
          onClose={() => setShowUpdateProfile(false)}
        />
      )}
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
