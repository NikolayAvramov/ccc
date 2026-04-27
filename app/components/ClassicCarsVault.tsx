"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";

const getFaqItems = (car: any) => [
  {
    key: "investment",
    question: "Добра ли е като инвестиция?",
    answer: `${car.name} е модел с ${car.rarity.toLowerCase()} статус и ограничено производство (${car.produced.toLocaleString()} броя). Пазарната оценка в момента е ${car.price}, а най-важните фактори за стойност са оригиналност, доказан произход и техническо състояние.`,
  },
  {
    key: "buying",
    question: "Какво да проверя при покупка?",
    answer:
      "Провери номер на шаси и съвпадение с документи, история на собствеността, следи от сериозни ремонти, оригинални компоненти (двигател/интериор/каросерия) и направи оглед при специалист по класически автомобили.",
  },
  {
    key: "racing",
    question: "Каква е състезателната история?",
    answer: `${car.name}: ${car.raceHistory}. Автомобили със спортно наследство обикновено са по-търсени сред колекционерите, особено когато имат ясна документална история.`,
  },
  {
    key: "collector",
    question: "Защо е ценена от колекционери?",
    answer: car.collectorsInfo,
  },
];

export default function ClassicCarsVault() {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [dbCars, setDbCars] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFaqKey, setSelectedFaqKey] = useState<string>("investment");
  const detailRef = useRef<any>(null);

  useEffect(() => {
    const loadDbCars = async () => {
      try {
        const res = await fetch("/api/vault-cars");
        if (!res.ok) return;
        const data = await res.json();
        setDbCars(data);
      } catch (error) {
        console.error("LOAD VAULT CARS ERROR:", error);
      }
    };
    loadDbCars();

    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) return;
        const user = await res.json();
        setIsAdmin(user.email === "test@w.bg");
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  const allCars = dbCars.map((car) => {
    const images = Array.isArray(car.images)
      ? car.images
      : car.image
        ? [car.image]
        : [];
    return {
      ...car,
      images,
      image: images[0] ?? car.image,
      _source: "db",
      _dbId: car.id,
    };
  });

  const filtered = allCars.filter((c) => {
    if (!search) return true;
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.make.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
    );
  });

  const openCar = (car: any) => {
    setSelectedCar(car);
    setSelectedFaqKey("investment");
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Сигурен ли си, че искаш да изтриеш тази статия?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/vault-cars/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      setDbCars((prev) => prev.filter((c) => c.id !== id));
      setSelectedCar(null);
    } catch {
      alert("Delete failed");
    }
  };

  const handleMigrateLocalData = async () => {
    try {
      const res = await fetch("/api/vault-cars/migrate-local", {
        method: "POST",
      });
      if (!res.ok) {
        alert("Migration failed");
        return;
      }
      const data = await res.json();
      const refresh = await fetch("/api/vault-cars");
      if (refresh.ok) {
        setDbCars(await refresh.json());
      }
      alert(`Migration complete. Inserted: ${data.inserted}, skipped: ${data.skipped}`);
    } catch {
      alert("Migration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] via-[#111111] to-[#171717] text-[#ece6d6]">
      {!selectedCar ? (
        <>
          <div className="border-b border-white/10 px-4 pb-12 pt-24 text-center md:px-8">
            <h1 className="mb-4 text-4xl font-bold text-orange-400 md:text-5xl">
              🏛️ Хранилище на Класически Коли
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
              Откройте историята, спецификациите и стойността на най-известните автомобили в света. Всяка кола е легенда.
            </p>
            <div className="mx-auto max-w-xl">
              <input
                type="text"
                placeholder="Търси по име, марка или страна..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-[15px] text-[#ece6d6] outline-none transition placeholder:text-neutral-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              />
              {isAdmin && (
                <div className="mt-4">
                  <Link
                    href="/vault/add"
                    className="inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    + Add Article
                  </Link>
                  <button
                    type="button"
                    onClick={handleMigrateLocalData}
                    className="ml-2 inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Migrate Local Data
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
            <p className="mb-8 text-sm text-neutral-500">
              ⚙️ Намерени: <strong>{filtered.length}</strong> коли
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-14 text-center text-lg text-neutral-500">
                Няма намерени коли. Опитайте други ключови думи.
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 pb-14">
                {filtered.map((car) => (
                  <div
                    key={car.id}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition duration-300 hover:-translate-y-1.5 hover:border-orange-400/70 hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
                    onClick={() => openCar(car)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${
                          car.rarity === "Legendary"
                            ? "bg-orange-400 text-black"
                            : car.rarity === "Rare"
                              ? "bg-purple-500/90 text-white"
                              : "bg-sky-500/90 text-white"
                        }`}
                      >
                        ⭐ {car.rarity}
                      </div>
                      <div
                        className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs text-white"
                      >
                        {car.country} • {car.year}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="mb-1 text-2xl font-semibold text-[#ece6d6]">
                        {car.name}
                      </h3>
                      <p className="mb-3 text-xs uppercase tracking-wider text-neutral-500">
                        {car.make} • {car.type}
                      </p>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                        {car.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-600">Произведено</div>
                          <div className="text-base font-bold text-orange-400">
                            {car.produced.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-600">Мощност</div>
                          <div className="text-base font-bold text-orange-400">
                            {car.horsepower} к.с.
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-600">Макс. скорост</div>
                          <div className="text-base font-bold text-orange-400">
                            {car.topSpeed} км/ч
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div ref={detailRef} className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-6">
          <button
            className="mb-8 inline-flex items-center rounded-lg border border-orange-400/70 px-4 py-2 text-sm font-semibold text-orange-300 transition hover:bg-orange-400/10"
            onClick={() => setSelectedCar(null)}
          >
            <FaChevronLeft className="mr-2" />
            Назад в хранилището
          </button>
          {isAdmin && selectedCar._source === "db" && selectedCar._dbId && (
            <>
              <Link
                href={`/vault/edit/${selectedCar._dbId}`}
                className="mb-8 ml-3 inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Edit Article
              </Link>
              <button
                onClick={() => handleDelete(selectedCar._dbId)}
                className="mb-8 ml-3 inline-flex items-center rounded-lg border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
              >
                Delete Article
              </button>
            </>
          )}

          <div className="relative mb-10 h-[360px] overflow-hidden rounded-2xl border border-white/10 md:h-[420px]">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <div className="mb-2 text-sm font-medium text-orange-300">
                ⭐ {selectedCar.rarity} | {selectedCar.country} {selectedCar.year}
              </div>
              <h1 className="text-3xl font-bold text-white md:text-5xl">
                {selectedCar.name}
              </h1>
            </div>
          </div>
          {selectedCar.images?.length > 1 && (
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {selectedCar.images.map((img: string, idx: number) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setSelectedCar((prev: any) => ({ ...prev, image: img }))}
                  className="overflow-hidden rounded-lg border border-white/15 transition hover:border-orange-400/60"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
              <div className="mb-10">
                <h2 className="mb-4 border-b-2 border-orange-400 pb-2 text-xl font-bold text-orange-300">
                  📖 История и Провенанс
                </h2>
                <p className="text-base leading-8 text-[#cbc2b0]">
                  {selectedCar.fullHistory}
                </p>
              </div>

              <div className="mb-6 rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
                <h3 className="mb-4 text-base font-bold text-[#ece6d6]">
                  ❓ Често задавани въпроси:
                </h3>

                <div className="mb-4 flex flex-wrap gap-2">
                  {getFaqItems(selectedCar).map((item) => (
                    <button
                      key={item.key}
                      className={`rounded-lg border px-3 py-2 text-xs transition ${
                        selectedFaqKey === item.key
                          ? "border-orange-300 bg-orange-400/20 text-orange-200"
                          : "border-orange-400/60 text-orange-300 hover:bg-orange-400/10"
                      }`}
                      onClick={() => setSelectedFaqKey(item.key)}
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
                <div className="rounded-lg border-l-4 border-orange-400 bg-[#0f0f0f] p-4 leading-7 text-[#d8d0c0]">
                  {getFaqItems(selectedCar).find((item) => item.key === selectedFaqKey)
                    ?.answer ?? "Няма налична информация."}
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                <h3 className="mb-4 text-base font-bold text-orange-400">
                  ⚙️ Технически Спецификации
                </h3>

                {[
                  ["Двигател", selectedCar.engine],
                  ["Мощност", `${selectedCar.horsepower} к.с.`],
                  ["Макс. Скорост", `${selectedCar.topSpeed} км/ч`],
                  ["Тегло", selectedCar.weight],
                  ["Произведено", selectedCar.produced.toLocaleString()],
                  ["Епоха", selectedCar.era],
                  ["Тип", selectedCar.type],
                  ["Страна", selectedCar.country],
                  ["Дизайнер", selectedCar.designer],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="mb-3 flex items-center justify-between border-b border-white/10 pb-3 text-sm"
                  >
                    <span className="text-neutral-400">{label}</span>
                    <span className="max-w-[55%] text-right font-bold text-orange-300">{value}</span>
                  </div>
                ))}

                <div className="mt-5 rounded-xl border border-orange-400/60 bg-orange-400/10 p-4 text-center">
                  <div className="mb-1 text-xs uppercase tracking-wider text-neutral-400">Прогнозна стойност</div>
                  <div className="text-3xl font-bold text-orange-300">
                    {selectedCar.price}
                  </div>
                </div>

                <div className="mt-4 text-xs italic text-neutral-500">
                  💡 Цените варират в зависимост от условието, историята и редкостта на вариантите.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
