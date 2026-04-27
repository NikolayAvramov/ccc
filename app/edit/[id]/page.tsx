"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { countries, carMakesAndModels } from "@/app/add-car/carData";
import ProtectedRoute from "@/app/components/ProtectedRoute";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Car = {
  id: string;
  make: string;
  model: string;
  type: string;
  price: string;
  mileage: string;
  location: string;
  description: string;
  year: string;
  images: string[];
};

type ImageItem =
  | { kind: "existing"; url: string }
  | { kind: "new"; file: File; preview: string };

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1885 + 1 }, (_, i) =>
  String(currentYear - i),
);

const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Coupe",
  "Convertible",
  "Hatchback",
  "Pickup Truck",
  "Van",
  "Wagon",
  "Sports Car",
  "Luxury",
];

function formatPrice(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="text-[13px] font-medium text-[#1c1a17]">
      {children}
      {required && <span className="ml-0.5 text-[#d97316]">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-[#dc2626]">⚠ {message}</p>
  );
}

function StepIndicator({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="flex items-center mb-9 gap-0">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          {/* CIRCLE */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition
        ${
          i < current
            ? "border-[#16a34a] bg-[#16a34a] text-white"
            : i === current
              ? "border-[#d97316] bg-[#d97316] text-white"
              : "border-[#e2e0d8] bg-white text-[#6b6860]"
        }`}
          >
            {i < current ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7L5.5 10L11.5 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>

          {/* LABEL */}
          <span
            className={`text-sm font-medium whitespace-nowrap
        ${
          i < current
            ? "text-[#16a34a]"
            : i === current
              ? "text-[#1c1a17]"
              : "text-[#6b6860]"
        }`}
          >
            {label}
          </span>

          {/* LINE */}
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-2
          ${i < current ? "bg-[#16a34a]" : "bg-[#e2e0d8]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
function EditCarContent() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<Car>({ mode: "onChange" });

  const [images, setImages] = useState<ImageItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [step, setStep] = useState(0); // 0 = photos, 1 = details, 2 = review
  const [priceDisplay, setPriceDisplay] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);

  /* ── FETCH ── */
  const { data, isLoading } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await fetch(`/api/cars/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      reset(data);
      setPriceDisplay(formatPrice(data.price || ""));
      setImages(
        (data.images || []).map((url: string) => ({ kind: "existing", url })),
      );
    }
  }, [data, reset]);

  /* ── IMAGE HANDLING ── */
  const addFiles = useCallback((files: File[]) => {
    const valid = files.filter((f) => f.type.startsWith("image/")).slice(0, 5);
    const items: ImageItem[] = valid.map((file) => ({
      kind: "new",
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => {
      const total = prev.length + items.length;
      if (total > 5) {
        return [...prev, ...items.slice(0, 5 - prev.length)];
      }
      return [...prev, ...items];
    });
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const item = prev[index];
      if (item.kind === "new") URL.revokeObjectURL(item.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  /* ── MOVE IMAGES (reorder) ── */
  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    setImages((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  /* ── SUBMIT ── */
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car", id] });
      setSaveSuccess(true);
      setTimeout(() => router.push("/profile"), 1800);
    },
  });

  const onSubmit = (data: Car) => {
    console.log(step);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") formData.append(key, value as string);
    });

    const existingUrls = images
      .filter((i) => i.kind === "existing")
      .map((i) => i.url);

    formData.append("existingImages", JSON.stringify(existingUrls));

    images
      .filter((i) => i.kind === "new")
      .forEach((i) => formData.append("images", i.file));

    mutation.mutate(formData);
  };

  /* ── WATCHERS ── */
  const make = watch("make");
  const models = make
    ? ((carMakesAndModels as Record<string, string[]>)[make] ?? [])
    : [];
  const watchAll = watch();

  const STEPS = ["Photos", "Details", "Review"];
  const fieldBaseClass =
    "w-full rounded-[10px] border-[1.5px] border-[#e2e0d8] bg-white px-[14px] py-2.5 text-sm text-[#1c1a17] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#d97316] focus:shadow-[0_0_0_3px_rgba(217,115,22,0.12)]";
  const inputClass = (hasError?: boolean) =>
    `${fieldBaseClass} ${hasError ? "border-[#dc2626] shadow-[0_0_0_3px_rgba(220,38,38,0.08)]" : ""}`;
  const selectClass = (hasError?: boolean) =>
    `${fieldBaseClass} cursor-pointer pr-9 ${hasError ? "border-[#dc2626] shadow-[0_0_0_3px_rgba(220,38,38,0.08)]" : ""}`;

  /* ── LOADING ── */
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-[#6b6860]">
        <div className="inline-block w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
        <p>Loading vehicle details…</p>
      </div>
    );
  }

  /* ── SUCCESS ── */
  if (saveSuccess) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-[#6b6860]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16a34a] text-[28px] text-white animate-[pop_0.4s_cubic-bezier(.34,1.56,.64,1)]">
          ✓
        </div>
        <h2 className="m-0 text-[26px] text-[#1c1a17] font-['DM_Serif_Display']">
          Changes saved!
        </h2>
        <p>Redirecting to your profile…</p>
      </div>
    );
  }

  /* ─────────── RENDER ─────────── */
  return (
    <>
      <div className="min-h-screen bg-[#f5f4f0] px-4 pb-20 pt-10 font-sans text-[#1c1a17]">
        <div className="max-w-[860px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              className="mb-4 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[13px] text-gray-500 transition-colors duration-200 hover:text-[#d97316]"
              onClick={() => router.back()}
            >
              ← Back
            </button>
            <h1 className="text-[32px] font-normal tracking-[-0.5px] mb-1 font-['DM_Serif_Display']">
              Edit Vehicle Listing
            </h1>
            <p className="text-sm text-[#6b6860]">
              Update your listing details — changes go live immediately after
              saving.
            </p>
          </div>

          {/* Step indicator */}
          <StepIndicator steps={STEPS} current={step} />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ── STEP 0: PHOTOS ── */}
            {step === 0 && (
              <div className="mb-5 rounded-[16px] border border-[#e2e0d8] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] max-[580px]:p-5">
                <div className="flex items-center gap-2 text-base font-semibold mb-5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff7ed] text-sm">
                    📸
                  </div>
                  Vehicle Photos
                </div>

                {/* Drop zone */}
                <div
                  ref={dropRef}
                  className={`relative cursor-pointer rounded-[10px] border-2 border-dashed p-8 text-center transition-all duration-200 ${dragOver ? "border-[#d97316] bg-[#fff7ed]" : "border-[#e2e0d8] bg-[#f9f8f5]"}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    disabled={images.length >= 5}
                  />
                  <div className="mb-2 text-[28px]">🖼️</div>
                  <p className="text-sm text-[#6b6860]">
                    Drag & drop photos here, or{" "}
                    <span className="cursor-pointer font-medium text-[#d97316]">
                      browse files
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[#6b6860]">
                    JPG, PNG, WEBP · Up to 5 photos · Max 10MB each
                  </p>
                </div>

                {/* Image count bar */}
                {images.length > 0 && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#6b6860]">
                    <span>{images.length}/5 photos</span>
                    <div className="h-1 flex-1 overflow-hidden rounded-[2px] bg-[#e2e0d8]">
                      <div
                        className="h-full rounded-[2px] bg-[#d97316] transition-[width] duration-300"
                        style={{ width: `${(images.length / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Image grid */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5">
                    {images.map((img, i) => {
                      const src =
                        img.kind === "existing" ? img.url : img.preview;
                      return (
                        <div
                          key={i}
                          className="group relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#e2e0d8] bg-[#f9f8f5]"
                        >
                          <img src={src} alt={`Photo ${i + 1}`} />
                          {i === 0 && (
                            <div className="absolute left-[5px] top-[5px] rounded bg-[#d97316] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.5px] text-white">
                              Cover
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/0 transition-colors duration-200 group-hover:bg-black/45">
                            {i > 0 && (
                              <button
                                type="button"
                                className="flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white/90 text-xs font-bold text-[#1c1a17] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                onClick={() => moveImage(i, i - 1)}
                                title="Move left"
                              >
                                ←
                              </button>
                            )}
                            <button
                              type="button"
                              className="flex h-7 w-7 items-center justify-center rounded-full border-0 bg-[#ef4444] text-xs font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                              onClick={() => removeImage(i)}
                              title="Remove"
                            >
                              ✕
                            </button>
                            {i < images.length - 1 && (
                              <button
                                type="button"
                                className="flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white/90 text-xs font-bold text-[#1c1a17] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                onClick={() => moveImage(i, i + 1)}
                                title="Move right"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {images.length === 0 && (
                  <p className="mt-3 text-center text-[13px] text-[#6b6860]">
                    No photos yet. Add at least one photo to continue.
                  </p>
                )}
              </div>
            )}

            {/* ── STEP 1: DETAILS ── */}
            {step === 1 && (
              <>
                {/* Make & Model */}
                <div className="mb-5 rounded-[16px] border border-[#e2e0d8] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] max-[580px]:p-5">
                  <div className="flex items-center gap-2 text-base font-semibold mb-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff7ed] text-sm">
                      🚗
                    </div>
                    Vehicle Identity
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-[5px]">
                      <FieldLabel required>Make</FieldLabel>
                      <select
                        className={selectClass(!!errors.make)}
                        {...register("make", { required: "Make is required" })}
                      >
                        <option value="">Select make…</option>
                        {Object.keys(carMakesAndModels).map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                      <FieldError message={errors.make?.message} />
                    </div>

                    <div className="flex flex-col gap-[5px]">
                      <FieldLabel required>Model</FieldLabel>
                      <select
                        className={selectClass(!!errors.model)}
                        {...register("model", {
                          required: "Model is required",
                        })}
                        disabled={!make}
                      >
                        <option value="">
                          {make ? "Select model…" : "Select make first"}
                        </option>
                        {models.map((m: string) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                      <FieldError message={errors.model?.message} />
                    </div>

                    <div className="flex flex-col gap-[5px]">
                      <FieldLabel required>Year</FieldLabel>
                      <select
                        className={selectClass(!!errors.year)}
                        {...register("year", { required: "Year is required" })}
                      >
                        <option value="">Select year…</option>
                        {years.map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </select>
                      <FieldError message={errors.year?.message} />
                    </div>

                    <div className="flex flex-col gap-[5px]">
                      <FieldLabel required>Type</FieldLabel>
                      <select
                        className={selectClass(!!errors.type)}
                        {...register("type", { required: "Type is required" })}
                      >
                        <option value="">Select type…</option>
                        {CAR_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <FieldError message={errors.type?.message} />
                    </div>
                  </div>
                </div>

                {/* Pricing & Details */}
                <div className="mb-5 rounded-[16px] border border-[#e2e0d8] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] max-[580px]:p-5">
                  <div className="flex items-center gap-2 text-base font-semibold mb-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff7ed] text-sm">
                      💰
                    </div>
                    Pricing & Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-[5px]">
                      <FieldLabel required>Price</FieldLabel>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b6860]">
                          $
                        </span>
                        <input
                          className={`${inputClass(!!errors.price)} pl-6`}
                          placeholder="0"
                          value={priceDisplay}
                          onChange={(e) => {
                            const fmt = formatPrice(e.target.value);
                            setPriceDisplay(fmt);
                            setValue("price", fmt.replace(/,/g, ""), {
                              shouldDirty: true,
                            });
                          }}
                        />
                      </div>
                      <FieldError message={errors.price?.message} />
                    </div>

                    <div className="flex flex-col gap-[5px]">
                      <FieldLabel required>Mileage</FieldLabel>
                      <input
                        className={inputClass(!!errors.mileage)}
                        placeholder="e.g. 45,000 km"
                        {...register("mileage", {
                          required: "Mileage is required",
                          pattern: {
                            value: /^\d[\d,. ]*[a-zA-Z]*$/,
                            message: "Enter a valid mileage",
                          },
                        })}
                      />
                      <FieldError message={errors.mileage?.message} />
                    </div>

                    <div className="col-span-full flex flex-col gap-[5px]">
                      <FieldLabel required>Location</FieldLabel>
                      <select
                        className={selectClass(!!errors.location)}
                        {...register("location", {
                          required: "Location is required",
                        })}
                      >
                        <option value="">Select country…</option>
                        {countries.map((c: string) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <FieldError message={errors.location?.message} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-5 rounded-[16px] border border-[#e2e0d8] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] max-[580px]:p-5">
                  <div className="flex items-center gap-2 text-base font-semibold mb-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff7ed] text-sm">
                      📝
                    </div>
                    Description
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <FieldLabel>Tell buyers about the vehicle</FieldLabel>
                    <textarea
                      className={`${inputClass(!!errors.description)} min-h-[110px] resize-y leading-[1.6]`}
                      placeholder="Condition, history, modifications, service records, reason for selling…"
                      maxLength={1000}
                      {...register("description", {
                        maxLength: {
                          value: 1000,
                          message: "Max 1000 characters",
                        },
                      })}
                    />
                    <p
                      className={`mt-0.5 text-right text-[11px] ${(watchAll.description?.length ?? 0) > 900 ? "text-[#dc2626]" : "text-[#6b6860]"}`}
                    >
                      {watchAll.description?.length ?? 0} / 1000
                    </p>
                    <FieldError message={errors.description?.message} />
                  </div>
                </div>
              </>
            )}

            {/* ── STEP 2: REVIEW ── */}
            {step === 2 && (
              <div className="mb-5 rounded-[16px] border border-[#e2e0d8] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] max-[580px]:p-5">
                <div className="flex items-center gap-2 text-base font-semibold mb-5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff7ed] text-sm">
                    ✅
                  </div>
                  Review & Save
                </div>

                {/* Preview images */}
                {images.length > 0 && (
                  <div className="mb-5 mt-3 flex flex-wrap gap-2">
                    {images.slice(0, 6).map((img, i) => (
                      <img
                        key={i}
                        className="h-[52px] w-16 rounded-md border border-[#e2e0d8] object-cover"
                        src={img.kind === "existing" ? img.url : img.preview}
                        alt=""
                      />
                    ))}
                    {images.length > 6 && (
                      <div className="flex h-[52px] w-16 items-center justify-center rounded-md border border-[#e2e0d8] bg-[#f9f8f5] text-[13px] font-semibold text-[#6b6860]">
                        +{images.length - 6}
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 min-[580px]:grid-cols-2">
                  {[
                    ["Make", watchAll.make],
                    ["Model", watchAll.model],
                    ["Year", watchAll.year],
                    ["Type", watchAll.type],
                    [
                      "Price",
                      watchAll.price ? `$${formatPrice(watchAll.price)}` : "—",
                    ],
                    ["Mileage", watchAll.mileage],
                    ["Location", watchAll.location],
                    [
                      "Photos",
                      `${images.length} photo${images.length !== 1 ? "s" : ""}`,
                    ],
                  ].map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded-[10px] border border-[#e2e0d8] bg-[#f9f8f5] px-[14px] py-3"
                    >
                      <div className="mb-[3px] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b6860]">
                        {key}
                      </div>
                      <div className="text-sm font-medium text-[#1c1a17]">
                        {val || "—"}
                      </div>
                    </div>
                  ))}
                </div>

                {watchAll.description && (
                  <div className="mt-3 rounded-[10px] border border-[#e2e0d8] bg-[#f9f8f5] px-[14px] py-3">
                    <div className="mb-[3px] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b6860]">
                      Description
                    </div>
                    <div className="text-[13px] font-medium leading-[1.6] text-[#6b6860]">
                      {watchAll.description}
                    </div>
                  </div>
                )}

                {mutation.isError && (
                  <div className="mt-4 rounded-[10px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                    ⚠ Failed to save. Please check your connection and try
                    again.
                  </div>
                )}
              </div>
            )}

            {/* ── STEP NAVIGATION ── */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <div>
                {step > 0 && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#e2e0d8] bg-transparent px-7 py-3 text-sm font-semibold text-[#6b6860] transition-all duration-200 hover:border-[#6b6860] hover:text-[#1c1a17]"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    ← Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isDirty && (
                  <span className="inline-flex items-center gap-[5px] text-xs font-medium text-[#d97316]">
                    <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#d97316]" />
                    Unsaved changes
                  </span>
                )}

                {step < 2 && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-[10px] border-0 bg-[#d97316] px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(217,115,22,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#b45309] hover:shadow-[0_4px_16px_rgba(217,115,22,0.35)] disabled:cursor-not-allowed disabled:opacity-55 disabled:transform-none"
                    onClick={() => {
                      if (step === 0 && images.length === 0) return;
                      setStep((prev) => Math.min(prev + 1, 2));
                    }}
                    disabled={step === 0 && images.length === 0}
                  >
                    Continue →
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-[10px] border-0 bg-[#d97316] px-7 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(217,115,22,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#b45309] hover:shadow-[0_4px_16px_rgba(217,115,22,0.35)] disabled:cursor-not-allowed disabled:opacity-55 disabled:transform-none"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
                        Saving…
                      </>
                    ) : (
                      "Save Changes ✓"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Unsaved changes floating toast */}
      {isDirty && step === 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-2.5 rounded-full text-sm flex items-center gap-2 shadow-lg animate-[slideUp_0.3s_ease]">
          You have unsaved changes
        </div>
      )}
    </>
  );
}

export default function EditCar() {
  return (
    <ProtectedRoute>
      <EditCarContent />
    </ProtectedRoute>
  );
}
