"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionExpired, setSessionExpired] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Проверка за истечен сесион
  useEffect(() => {
    if (searchParams.get("session") === "expired") {
      setSessionExpired(true);
    }
  }, [searchParams]);

  function onDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      console.log(formValues);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("LOGIN SUCCESS:", data);
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,15,25,0.45), rgba(10,15,25,0.55)), url('/homeBG.jpeg')",
      }}
    >
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 animate-[slideIn_0.5s_ease-out]">
        {/* Session Expired Alert */}
        {sessionExpired && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-semibold">⏰ Session Expired</p>
            <p className="text-red-600 text-sm mt-1">
              Your session has expired. Please log in again to continue.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome back
          </h2>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={onSubmitLogin}>
          {/* Email */}
          <div className="relative">
            <input
              placeholder="Email"
              type="email"
              required
              name="email"
              value={formValues.email}
              onChange={onDataChange}
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 valid:border-green-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              name="password"
              value={formValues.password}
              onChange={onDataChange}
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 valid:border-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot password */}
          <Link
            href="/forgot-password"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot Password?
          </Link>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 py-3 px-6 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-300 transition active:translate-y-0"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-500 text-sm">
          Don't have an account{" "}
          <Link
            href="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
