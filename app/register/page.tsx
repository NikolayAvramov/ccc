"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdCloudUpload } from "react-icons/io";
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  rePassword: string;
  avatar: FileList;
};

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const inputClass =
    "w-full p-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const errorClass = "text-red-500 text-sm";
  const eyeClass =
    "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer";

  // 🔵 React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch("password");

  // 📸 Avatar preview
  const avatar = watch("avatar");
  const preview = avatar?.[0] ? URL.createObjectURL(avatar[0]) : null;

  // 🔥 React Query mutation
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);

      if (data.avatar?.[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Register failed");
      }

      return res.json();
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  return (
    <div
      className="flex min-h-screen w-full items-start justify-center overflow-y-auto bg-cover bg-center bg-no-repeat px-4 py-6 md:items-center md:p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,15,25,0.45), rgba(10,15,25,0.55)), url('/homeBG.jpeg')",
      }}
    >
      <div className="mb-6 mt-16 w-full max-w-lg rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md md:mb-0 md:mt-8 md:p-8">
        {/* Header */}
        <h2 className="mb-4 text-center text-3xl font-bold">
          Create an account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* 🔥 AVATAR (FIXED + CENTERED + PREVIEW) */}
          <div className="flex justify-center">
            <label className="group relative h-24 w-24 cursor-pointer md:h-28 md:w-28">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                    <IoMdCloudUpload className="text-2xl text-blue-500" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                  </div>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white text-sm">Change</span>
              </div>

              <input type="file" className="hidden" {...register("avatar")} />
            </label>
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email", { required: "Email required" })}
              placeholder="Email"
              className={inputClass}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <input
              {...register("firstName", { required: "First name required" })}
              placeholder="First Name"
              className={inputClass}
            />
            {errors.firstName && (
              <p className={errorClass}>{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              {...register("lastName", { required: "Last name required" })}
              placeholder="Last Name"
              className={inputClass}
            />
            {errors.lastName && (
              <p className={errorClass}>{errors.lastName.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
              placeholder="Password"
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className={eyeClass}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showRePassword ? "text" : "password"}
              {...register("rePassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowRePassword((s) => !s)}
              className={eyeClass}
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.rePassword && (
              <p className={errorClass}>{errors.rePassword.message}</p>
            )}
          </div>

          {/* Server error */}
          {mutation.error && (
            <p className="text-red-500 text-sm text-center">
              {(mutation.error as Error).message}
            </p>
          )}
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              required
              className="mt-1"
              checked={isAgree}
              onChange={(e) => setIsAgree(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <a href="/terms" className="text-orange-500 underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-orange-500 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending && isAgree}
            className="mt-2 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:-translate-y-1 hover:shadow-lg transition disabled:opacity-50"
          >
            {mutation.isPending ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-500 text-sm">
          Already have an account{" "}
          <Link
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>

        <p className="text-center text-gray-400 my-2">or</p>

        {/* Social */}
        <div className="flex gap-3 justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 transition">
            Sign in with <FaGoogle />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 transition">
            Sign in with <FaFacebook />
          </button>
        </div>
      </div>
    </div>
  );
}
