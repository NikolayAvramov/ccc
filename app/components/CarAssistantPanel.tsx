"use client";

import { useCarAssistant } from "@/hooks/useCarAssistant";

type Variant = "light" | "dark" | "widget";

type CarAssistantPanelProps = {
  variant?: Variant;
  showDevTools?: boolean;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  suggestedQuestions?: string[];
  className?: string;
};

const variantStyles: Record<
  Variant,
  {
    shell: string;
    title: string;
    subtitle: string;
    label: string;
    input: string;
    select: string;
    answer: string;
    chip: string;
    chipHover: string;
    error: string;
    sources: string;
    submit: string;
    muted: string;
  }
> = {
  light: {
    shell: "rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8",
    title: "text-2xl font-bold text-gray-800",
    subtitle: "text-sm text-gray-500",
    label: "text-sm font-medium text-gray-700",
    input:
      "resize-y rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200",
    select:
      "rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200",
    answer: "rounded-lg bg-gray-50 p-4 text-sm text-gray-800",
    chip: "rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs text-orange-900",
    chipHover: "hover:bg-orange-100",
    error: "rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700",
    sources: "rounded-lg bg-gray-50 p-4 text-sm text-gray-700",
    submit:
      "rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50",
    muted: "text-sm text-gray-600",
  },
  dark: {
    shell: "rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6",
    title: "text-xl font-bold text-[#ece6d6]",
    subtitle: "text-sm text-[#cbc2b0]",
    label: "text-sm font-medium text-[#ece6d6]",
    input:
      "resize-y rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-[#ece6d6] placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20",
    select:
      "rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-[#ece6d6] focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20",
    answer:
      "rounded-lg border-l-4 border-orange-400 bg-[#0f0f0f] p-4 text-sm leading-7 text-[#d8d0c0]",
    chip: "rounded-lg border border-orange-400/60 px-3 py-1.5 text-xs text-orange-300",
    chipHover: "hover:bg-orange-400/10",
    error:
      "rounded-lg border-l-4 border-red-400 bg-red-950/40 px-3 py-2 text-sm text-red-200",
    sources: "rounded-lg bg-[#0f0f0f] p-4 text-sm text-[#cbc2b0]",
    submit:
      "rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50",
    muted: "text-sm text-neutral-400",
  },
  widget: {
    shell: "flex h-full flex-col bg-[#141414] text-[#ece6d6]",
    title: "text-base font-bold text-white",
    subtitle: "text-xs text-neutral-400",
    label: "text-xs font-medium text-neutral-300",
    input:
      "resize-none rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20",
    select:
      "rounded-lg border border-white/15 bg-black/50 px-2 py-1.5 text-xs text-white focus:border-orange-400 focus:outline-none",
    answer:
      "rounded-lg border border-white/10 bg-black/40 p-3 text-sm leading-6 text-[#d8d0c0]",
    chip: "rounded-full border border-orange-400/50 px-2.5 py-1 text-[11px] text-orange-200",
    chipHover: "hover:bg-orange-400/10",
    error: "rounded-lg bg-red-950/50 px-3 py-2 text-xs text-red-200",
    sources: "rounded-lg bg-black/40 p-3 text-xs text-neutral-400",
    submit:
      "rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50",
    muted: "text-xs text-neutral-500",
  },
};

export default function CarAssistantPanel({
  variant = "light",
  showDevTools = false,
  title = "Автомобилен асистент",
  subtitle = "Питай за класически коли — отговорите идват от базата данни на Classic Car Center.",
  placeholder = "Напр.: Какво да проверя при покупка на класическа кола?",
  suggestedQuestions = [],
  className = "",
}: CarAssistantPanelProps) {
  const styles = variantStyles[variant];
  const assistant = useCarAssistant();
  const isCompact = variant === "widget";

  return (
    <div className={`${styles.shell} ${className}`}>
      <div
        className={
          isCompact
            ? "border-b border-white/10 px-4 py-3"
            : variant === "light"
              ? "mb-6 border-b border-gray-100 pb-4"
              : "mb-6 border-b border-white/10 pb-4"
        }
      >
        <h2 className={styles.title}>{title}</h2>
        {!isCompact && <p className={`mt-1 ${styles.subtitle}`}>{subtitle}</p>}
        {isCompact && <p className={`mt-0.5 ${styles.subtitle}`}>{subtitle}</p>}
      </div>

      <div className={isCompact ? "flex flex-1 flex-col overflow-hidden px-4 py-3" : ""}>
        {showDevTools && assistant.indexReady === false && (
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">
            <span>Няма индекс на документи.</span>
            <button
              type="button"
              onClick={assistant.buildIndex}
              disabled={assistant.buildingIndex}
              className="rounded-lg border border-blue-200 bg-white px-3 py-1 text-xs font-medium hover:bg-blue-100 disabled:opacity-50"
            >
              {assistant.buildingIndex ? "Индексиране…" : "Индексирай документи"}
            </button>
          </div>
        )}

        {assistant.error && (
          <div className={`mb-4 ${styles.error}`}>{assistant.error}</div>
        )}

        {suggestedQuestions.length > 0 && (
          <div className={`mb-3 flex flex-wrap gap-2 ${isCompact ? "" : "mb-4"}`}>
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => {
                  assistant.setPrompt(question);
                  void assistant.ask(question);
                }}
                disabled={assistant.loading}
                className={`${styles.chip} ${styles.chipHover} disabled:opacity-50`}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={assistant.handleSubmit}
          className={`flex flex-col gap-3 ${isCompact ? "flex-1" : "gap-4"}`}
        >
          {showDevTools && (
            <div className="flex flex-wrap items-end gap-3">
              <label className={`flex min-w-[180px] flex-1 flex-col gap-1 ${styles.label}`}>
                Chat модел
                <select
                  value={assistant.model}
                  onChange={(e) => assistant.setModel(e.target.value)}
                  disabled={assistant.loadingModels || assistant.models.length === 0}
                  className={styles.select}
                >
                  {assistant.models.length === 0 ? (
                    <option value="">Няма chat модел</option>
                  ) : (
                    assistant.models.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))
                  )}
                </select>
              </label>
              <button
                type="button"
                onClick={assistant.loadModels}
                disabled={assistant.loadingModels}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Refresh
              </button>
            </div>
          )}

          {showDevTools && assistant.isCoderModel && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              За по-добър български използвай <code>qwen2.5:7b</code>.
            </p>
          )}

          <label className={`flex flex-col gap-1 ${styles.label}`}>
            {isCompact ? null : "Въпрос за коли"}
            <textarea
              value={assistant.prompt}
              onChange={(e) => assistant.setPrompt(e.target.value)}
              rows={isCompact ? 3 : 4}
              placeholder={placeholder}
              className={styles.input}
            />
          </label>

          <button
            type="submit"
            disabled={assistant.loading || !assistant.model || !assistant.prompt.trim()}
            className={styles.submit}
          >
            {assistant.loading ? "Мисли…" : "Изпрати въпрос"}
          </button>
        </form>

        <div className={isCompact ? "mt-3 flex-1 overflow-y-auto" : "mt-6"}>
          {assistant.response && (
            <div>
              <h3 className={`mb-2 font-semibold ${styles.muted}`}>Отговор</h3>
              <div
                className={`max-h-[280px] overflow-y-auto whitespace-pre-wrap ${styles.answer}`}
              >
                {assistant.response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
