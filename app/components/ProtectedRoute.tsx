"use client";

import { ReactNode } from "react";
import { useAuth } from "@/app/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth({ required: true });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 font-semibold text-lg">
              🔒 Ще бъдете пренасочени към вход...
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Трябва да сте влезнали за да достъпите тази страница.
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
