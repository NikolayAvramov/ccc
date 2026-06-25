"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CarAssistantWidget from "@/app/components/CarAssistantWidget";

const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <CarAssistantWidget />
    </QueryClientProvider>
  );
}
