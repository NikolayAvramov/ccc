import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface UseAuthOptions {
  redirectTo?: string;
  required?: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { redirectTo = "/login", required = false } = options;
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/user", {
        credentials: "include",
      });

      if (res.status === 401) {
        // Токен е невалиден или истекнат
        // Обриши го токенот и редиректирај
        await fetch("/api/logout", {
          method: "POST",
          credentials: "include",
        }).catch(() => {});

        return null;
      }

      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    retry: false,
    staleTime: 60 * 5 * 1000, // 5 минути
  });

  useEffect(() => {
    // Ако е потребна аутентификација и нема корисник, редиректирај
    if (required && !isLoading && !user) {
      const redirectUrl = new URL(redirectTo, window.location.origin);

      // Ако имаше 401 грешка (истечен токен), додај параметар
      if (error) {
        redirectUrl.searchParams.set("session", "expired");
      }

      router.push(redirectUrl.toString());
    }
  }, [user, isLoading, required, error, router, redirectTo]);

  // Проверка за session expired параметар
  useEffect(() => {
    if (searchParams.get("session") === "expired") {
      console.warn("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}
