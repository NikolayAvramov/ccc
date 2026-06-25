"use client";

import { useCallback, useEffect, useState } from "react";

export function useCarAssistant() {
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingModels, setLoadingModels] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [indexReady, setIndexReady] = useState(false);
  const [buildingIndex, setBuildingIndex] = useState(false);

  const isCoderModel = /coder/i.test(model);

  const loadModels = useCallback(async () => {
    setLoadingModels(true);
    setError(null);

    try {
      const res = await fetch("/api/ollama");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to load models");
      }

      const allNames =
        (data.models as Array<{ name: string }> | undefined)?.map((m) => m.name) ??
        [];
      const chatNames = Array.isArray(data.chatModels)
        ? (data.chatModels as string[])
        : allNames.filter((name) => !/embed/i.test(name));
      const defaultChat =
        typeof data.defaultChatModel === "string" ? data.defaultChatModel : "";

      setModels(chatNames);
      setModel((prev) => {
        if (prev && chatNames.includes(prev)) return prev;
        if (defaultChat && chatNames.includes(defaultChat)) return defaultChat;
        return chatNames[0] ?? "";
      });
    } catch (err) {
      setModels([]);
      setError(err instanceof Error ? err.message : "Failed to connect");
    } finally {
      setLoadingModels(false);
    }
  }, []);

  const loadIndexStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/ollama/index");
      const data = await res.json();
      if (!res.ok) return;
      setIndexReady(Boolean(data.ready));
    } catch {
      setIndexReady(false);
    }
  }, []);

  useEffect(() => {
    void loadModels();
    void loadIndexStatus();
  }, [loadModels, loadIndexStatus]);

  async function buildIndex() {
    setBuildingIndex(true);
    setError(null);
    try {
      const res = await fetch("/api/ollama/index", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details ?? data.error ?? "Index build failed");
      }
      setIndexReady(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Index build failed");
    } finally {
      setBuildingIndex(false);
    }
  }

  async function ask(question?: string) {
    const text = (question ?? prompt).trim();
    if (!model.trim() || !text) return;

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch("/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt: text, stream: false }),
      });

      const data = await res.json();

      if (!res.ok) {
        const parts = [data.error, data.details, data.hint].filter(Boolean);
        throw new Error(parts.join(" — ") || "Request failed");
      }

      setResponse(
        typeof data.response === "string"
          ? data.response
          : JSON.stringify(data, null, 2),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void ask();
  }

  return {
    models,
    model,
    setModel,
    prompt,
    setPrompt,
    response,
    loading,
    loadingModels,
    error,
    indexReady,
    buildingIndex,
    isCoderModel,
    loadModels,
    buildIndex,
    ask,
    handleSubmit,
  };
}
