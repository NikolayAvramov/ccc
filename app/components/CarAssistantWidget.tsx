"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

import CarAssistantPanel from "@/app/components/CarAssistantPanel";

const HIDDEN_PATHS = ["/ollama-test"];

export default function CarAssistantWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return null;
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-40 flex h-[min(560px,75vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1a1a] px-3 py-2">
            <span className="text-sm font-semibold text-orange-300">Classic Car Center</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Затвори асистента"
            >
              <FaTimes size={14} />
            </button>
          </div>
          <CarAssistantPanel
            variant="widget"
            title="Автомобилен асистент"
            subtitle="Въпроси за класически коли, Vault и шоурум."
            placeholder="Питай за марка, модел, покупка, реставрация…"
            suggestedQuestions={[
              "Какво да проверя при покупка на класическа кола?",
              "Какво означава matching numbers?",
            ]}
            className="flex-1 overflow-hidden"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 hover:shadow-xl"
        aria-label={open ? "Затвори асистента" : "Отвори автомобилен асистент"}
      >
        {open ? <FaTimes size={16} /> : <FaComments size={16} />}
        <span className="hidden sm:inline">{open ? "Затвори" : "Асистент"}</span>
      </button>
    </>
  );
}
