"use client";

import { useState, useRef } from "react";
import {
  FaCar,
  FaImage,
  FaInfo,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { countries, carMakesAndModels } from "@/app/add-car/carData";
import ProtectedRoute from "@/app/components/ProtectedRoute";

type CarMake = keyof typeof carMakesAndModels;

function AddCarContent() {
  const [imagesArr, setImageArr] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formValues, setFormValues] = useState<{
    make: CarMake | "";
    model: string;
    type: string;
    price: string;
    mileage: string;
    description: string;
    location: string;
    year: string;
  }>({
    make: "",
    model: "",
    type: "",
    price: "",
    mileage: "",
    description: "",
    location: "",
    year: "",
  });
  const router = useRouter();
  const inputClass =
    "w-full p-3 border-2 border-gray-200 rounded-lg outline-none focus:border-orange-500 transition";

  const steps = [
    { id: 1, title: "Basic Info", icon: <FaCar /> },
    { id: 2, title: "Specs", icon: <FaInfo /> },
    { id: 3, title: "Photos", icon: <FaImage /> },
    { id: 4, title: "Review", icon: <FaCheck /> },
  ];

  // ✅ SUBMIT
  async function handleSubmit() {
    try {
      const formData = new FormData();

      // text fields
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // images
      imagesArr.forEach((file) => {
        formData.append("images", file);
      });

      console.log("🚀 SENDING FILES");

      const res = await fetch("/api/add-car", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed");
      }

      console.log("✅ CREATED:", result);

      // reset
      setImageArr([]);
      setFormValues({
        make: "",
        model: "",
        type: "",
        price: "",
        mileage: "",
        description: "",
        location: "",
        year: "",
      });

      router.push("/showroom");
    } catch (err) {
      console.log("❌ SUBMIT ERROR:", err);
    }
  }

  function onDataChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;

    setFormValues((s) => {
      if (name === "make") {
        return {
          ...s,
          make: value as CarMake,
          model: "",
        };
      }
      return { ...s, [name]: value };
    });
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/"),
    );

    setImageArr((s) => [...s, ...files].slice(0, 5));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );

    setImageArr((s) => [...s, ...files].slice(0, 5));
    setIsDragging(false);
  }

  function isStepValid(step: number) {
    if (step === 1)
      return formValues.make && formValues.model && formValues.type;
    if (step === 2)
      return (
        formValues.year &&
        formValues.price &&
        formValues.mileage &&
        formValues.location
      );
    if (step === 3) return imagesArr.length > 0;
    if (step === 4) return formValues.description;
    return false;
  }

  const models = formValues.make ? carMakesAndModels[formValues.make] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Add New Car</h2>
          <button
            onClick={() => router.push("/profile")}
            className="text-gray-500"
          >
            <FaTimes />
          </button>
        </div>

        {/* STEPS */}
        <div className="flex justify-between px-6 py-4 border-b">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    currentStep >= s.id
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > s.id ? <FaCheck /> : s.icon}
                </div>
                <span className="text-xs mt-1">{s.title}</span>
              </div>

              {i < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 ${
                    currentStep > s.id ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="grid gap-4">
              <select
                name="make"
                value={formValues.make}
                onChange={onDataChange}
                className={inputClass}
              >
                <option value="">Select make</option>
                {(Object.keys(carMakesAndModels) as CarMake[]).map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>

              <select
                name="model"
                value={formValues.model}
                onChange={onDataChange}
                disabled={!formValues.make}
                className={inputClass}
              >
                <option value="">Select model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>

              <select
                name="type"
                value={formValues.type}
                onChange={onDataChange}
                className={inputClass}
              >
                <option value="">Select type</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Wagon">Wagon</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="grid gap-4">
              <input
                name="year"
                placeholder="Year"
                className={inputClass}
                onChange={onDataChange}
              />
              <input
                name="price"
                placeholder="Price"
                className={inputClass}
                onChange={onDataChange}
              />
              <input
                name="mileage"
                placeholder="Mileage"
                className={inputClass}
                onChange={onDataChange}
              />

              <select
                name="location"
                value={formValues.location}
                onChange={onDataChange}
                className={inputClass}
              >
                <option value="">Select country</option>
                {countries.map((c: string) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-10 text-center rounded-xl cursor-pointer ${
                isDragging ? "border-orange-400" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <FaUpload className="mx-auto text-3xl text-orange-400 mb-2" />
              Click or drag images here
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {imagesArr.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="rounded-lg object-cover h-24 w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <textarea
              name="description"
              placeholder="Description..."
              className={`${inputClass} h-32`}
              onChange={onDataChange}
            />
          )}
        </div>

        {/* NAV */}
        <div className="flex justify-between items-center p-6 border-t">
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 1}
            className="text-gray-500"
          >
            <FaArrowLeft />
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!isStepValid(currentStep)}
              className="bg-orange-500 text-white px-5 py-2 rounded-lg"
            >
              Next <FaArrowRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className="bg-green-500 text-white px-5 py-2 rounded-lg"
            >
              <FaCheck /> Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AddCar() {
  return (
    <ProtectedRoute>
      <AddCarContent />
    </ProtectedRoute>
  );
}
