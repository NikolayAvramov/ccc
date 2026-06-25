"use client";

import CarAssistantPanel from "@/app/components/CarAssistantPanel";

export default function OllamaTest() {
  return (
    <CarAssistantPanel
      variant="light"
      showDevTools
      title="Car assistant (Ollama)"
      subtitle="Само въпроси за коли. Преди отговор асистентът търси в документите на Classic Car Center (Vault + шоурум)."
    />
  );
}
