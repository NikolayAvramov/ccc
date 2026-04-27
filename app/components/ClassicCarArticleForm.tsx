"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  year: string;
  country: string;
  make: string;
  era: string;
  type: string;
  produced: string;
  engine: string;
  horsepower: string;
  topSpeed: string;
  price: string;
  rarity: string;
  image: string;
  description: string;
  fullHistory: string;
  highlights: string;
  designer: string;
  weight: string;
  raceHistory: string;
  collectorsInfo: string;
  images?: string[];
};

type Props = {
  mode: "create" | "edit";
  articleId?: string;
  initialData?: Partial<FormData>;
};

const baseInput =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-[#ece6d6] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20";

export default function ClassicCarArticleForm({
  mode,
  articleId,
  initialData,
}: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    Array.isArray((initialData as any)?.images)
      ? ((initialData as any).images as string[])
      : initialData?.image
        ? [initialData.image]
        : [],
  );
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: initialData?.name ?? "",
    year: initialData?.year ?? "",
    country: initialData?.country ?? "",
    make: initialData?.make ?? "",
    era: initialData?.era ?? "",
    type: initialData?.type ?? "",
    produced: initialData?.produced ?? "",
    engine: initialData?.engine ?? "",
    horsepower: initialData?.horsepower ?? "",
    topSpeed: initialData?.topSpeed ?? "",
    price: initialData?.price ?? "",
    rarity: initialData?.rarity ?? "",
    image: initialData?.image ?? "",
    description: initialData?.description ?? "",
    fullHistory: initialData?.fullHistory ?? "",
    highlights: initialData?.highlights ?? "",
    designer: initialData?.designer ?? "",
    weight: initialData?.weight ?? "",
    raceHistory: initialData?.raceHistory ?? "",
    collectorsInfo: initialData?.collectorsInfo ?? "",
  });

  const title = useMemo(
    () => (mode === "create" ? "Add Vault Article" : "Edit Vault Article"),
    [mode],
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFiles = (files: File[]) => {
    const valid = files.filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) return;
    setNewImageFiles((prev) => [...prev, ...valid].slice(0, 5 - existingImages.length));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    const url =
      mode === "create" ? "/api/vault-cars" : `/api/vault-cars/${articleId}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("year", form.year);
      payload.append("country", form.country);
      payload.append("make", form.make);
      payload.append("era", form.era);
      payload.append("type", form.type);
      payload.append("produced", form.produced);
      payload.append("engine", form.engine);
      payload.append("horsepower", form.horsepower);
      payload.append("topSpeed", form.topSpeed);
      payload.append("price", form.price);
      payload.append("rarity", form.rarity);
      payload.append("description", form.description);
      payload.append("fullHistory", form.fullHistory);
      payload.append("highlights", form.highlights);
      payload.append("designer", form.designer);
      payload.append("weight", form.weight);
      payload.append("raceHistory", form.raceHistory);
      payload.append("collectorsInfo", form.collectorsInfo);
      payload.append("existingImages", JSON.stringify(existingImages));
      newImageFiles.forEach((file) => payload.append("images", file));

      const res = await fetch(url, {
        method,
        body: payload,
      });
      if (res.status === 401 || res.status === 403) {
        setError("Session expired or no access. Please login again as test@w.bg.");
        return;
      }
      if (!res.ok) throw new Error("Save failed");
      router.push("/vault");
      router.refresh();
    } catch {
      setError("Could not save article. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] via-[#111111] to-[#171717] px-4 pb-12 pt-24 text-[#ece6d6]">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-black/45 to-black/20 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-orange-400/20 bg-orange-500/5 px-4 py-3">
          <h1 className="text-2xl font-bold text-orange-300 md:text-3xl">{title}</h1>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-neutral-300">
            Vault Admin
          </span>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input name="name" placeholder="Car name" className={baseInput} value={form.name} onChange={onChange} required />
            <input name="make" placeholder="Make" className={baseInput} value={form.make} onChange={onChange} required />
            <input name="year" placeholder="Year" type="number" className={baseInput} value={form.year} onChange={onChange} required />
            <input name="country" placeholder="Country" className={baseInput} value={form.country} onChange={onChange} required />
            <input name="era" placeholder="Era (e.g. 1960s)" className={baseInput} value={form.era} onChange={onChange} required />
            <input name="type" placeholder="Type" className={baseInput} value={form.type} onChange={onChange} required />
            <input name="produced" placeholder="Produced units" type="number" className={baseInput} value={form.produced} onChange={onChange} required />
            <input name="engine" placeholder="Engine" className={baseInput} value={form.engine} onChange={onChange} required />
            <input name="horsepower" placeholder="Horsepower (e.g. 302 or 60-75)" className={baseInput} value={form.horsepower} onChange={onChange} required />
            <input name="topSpeed" placeholder="Top speed (km/h)" type="number" className={baseInput} value={form.topSpeed} onChange={onChange} required />
            <input name="price" placeholder="Price range" className={baseInput} value={form.price} onChange={onChange} required />
            <input name="rarity" placeholder="Rarity" className={baseInput} value={form.rarity} onChange={onChange} required />
            <input name="designer" placeholder="Designer" className={baseInput} value={form.designer} onChange={onChange} required />
            <input name="weight" placeholder="Weight" className={baseInput} value={form.weight} onChange={onChange} required />
            <div
              className={`md:col-span-2 rounded-2xl border-2 border-dashed p-4 transition ${
                isDragging
                  ? "border-orange-400 bg-orange-500/10"
                  : "border-white/20 bg-black/20"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleAddFiles(Array.from(e.dataTransfer.files || []));
              }}
            >
              <label className="mb-2 block text-sm text-neutral-300">
                Car Images (up to 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleAddFiles(Array.from(e.target.files || []));
                }}
                className="w-full text-sm text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-600"
                required={mode === "create" && existingImages.length === 0 && newImageFiles.length === 0}
              />
              <p className="mt-2 text-xs text-neutral-400">
                Drag & drop or choose files ({existingImages.length + newImageFiles.length}/5).
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {existingImages.map((img, idx) => (
                  <div key={`existing-${img}-${idx}`} className="relative">
                    <img
                      src={img}
                      alt={`Existing ${idx + 1}`}
                      className="h-24 w-full rounded-lg border border-white/10 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setExistingImages((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {newImageFiles.map((file, idx) => (
                  <div key={`new-${idx}-${file.name}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New ${idx + 1}`}
                      className="h-24 w-full rounded-lg border border-orange-400/40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewImageFiles((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <textarea name="description" placeholder="Short description" className={`${baseInput} min-h-28 md:col-span-2`} value={form.description} onChange={onChange} required />
            <textarea name="fullHistory" placeholder="Full history" className={`${baseInput} min-h-36 md:col-span-2`} value={form.fullHistory} onChange={onChange} required />
            <textarea name="raceHistory" placeholder="Race history" className={`${baseInput} min-h-24 md:col-span-2`} value={form.raceHistory} onChange={onChange} required />
            <textarea name="collectorsInfo" placeholder="Collectors info" className={`${baseInput} min-h-24 md:col-span-2`} value={form.collectorsInfo} onChange={onChange} required />
            <textarea name="highlights" placeholder={"Highlights (one per line)\nFirst highlight\nSecond highlight"} className={`${baseInput} min-h-32 md:col-span-2`} value={form.highlights} onChange={onChange} required />

            {error && <p className="md:col-span-2 text-sm text-red-400">{error}</p>}

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="button" onClick={() => router.push("/vault")} className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5">
                Cancel
              </button>
              <button type="submit" disabled={isSaving} className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60">
                {isSaving ? "Saving..." : mode === "create" ? "Create Article" : "Save Changes"}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
