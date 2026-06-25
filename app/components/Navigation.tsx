"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "../../services/userServices";
import { GiHomeGarage } from "react-icons/gi";
import { AiOutlineLogin, AiOutlineHome } from "react-icons/ai";
import { FaRegistered } from "react-icons/fa";
import { MdOutlineAccountBox } from "react-icons/md";

import logo from "../../public/Untitled-1.png";
type NavigationProps = {
  isLogedIn: boolean;
};
export function Navigation({ isLogedIn }: NavigationProps) {
  const router = useRouter();

  // 👉 временно (докато направиш auth)

  console.log("isLogedIn:", isLogedIn);
  async function onLogoutClick() {
    await logout(); // 🔥 чакаш да се изтрие cookie
    router.push("/");
    router.refresh(); // 🔥 обновява layout (isLoggedIn)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-[4.5rem] flex items-center justify-between px-4 z-50 backdrop-blur-md shadow-md bg-gradient-to-b from-black/90 via-gray-800/70 to-gray-400/30">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer transition hover:scale-105"
      >
        <Image src={logo} alt="logo" className="h-16 w-auto" />
      </div>

      {/* Links */}
      <ul className="flex gap-2 items-center">
        {/* Home */}
        <li className="hidden md:block">
          <Link
            href="/"
            className="text-gray-200 text-lg px-4 py-2 rounded-md hover:text-orange-400 hover:bg-orange-400/10 transition hover:-translate-y-[1px]"
          >
            Начална страница
          </Link>
        </li>

        <li className="md:hidden">
          <Link
            href="/"
            className="text-gray-200 text-2xl p-2 hover:text-orange-400 hover:scale-110 transition"
          >
            <AiOutlineHome />
          </Link>
        </li>

        {/* Showroom */}
        <li className="hidden md:block">
          <Link
            href="/showroom"
            className="text-gray-200 text-lg px-4 py-2 rounded-md hover:text-orange-400 hover:bg-orange-400/10 transition"
          >
            Шоурум
          </Link>
        </li>

        <li className="md:hidden">
          <Link
            href="/showroom"
            className="text-gray-200 text-2xl p-2 hover:text-orange-400 hover:scale-110 transition"
          >
            <GiHomeGarage />
          </Link>
        </li>

        {/* Vault */}
        <li className="hidden md:block">
          <Link
            href="/vault"
            className="text-gray-200 text-lg px-4 py-2 rounded-md hover:text-orange-400 hover:bg-orange-400/10 transition"
          >
          Научи повече
          </Link>
        </li>

        <li className="md:hidden">
          <Link
            href="/vault"
            className="text-gray-200 text-sm px-2 py-1 hover:text-orange-400 transition"
          >
          Научи повече
          </Link>
        </li>

        {isLogedIn ? (
          <>
            {/* Profile */}
            <li className="hidden md:block">
              <Link
                href="/profile"
                className="text-gray-200 text-lg px-4 py-2 rounded-md hover:text-orange-400 hover:bg-orange-400/10 transition"
              >
                Профил
              </Link>
            </li>

            <li className="md:hidden">
              <Link
                href="/profile"
                className="text-gray-200 text-2xl p-2 hover:text-orange-400 hover:scale-110 transition"
              >
                <MdOutlineAccountBox />
              </Link>
            </li>

            {/* Logout */}
            <li
              onClick={onLogoutClick}
              className="hidden md:block text-gray-200 text-lg px-4 py-2 cursor-pointer hover:text-orange-400 hover:bg-orange-400/10 rounded-md transition"
            >
              Изход
            </li>

            <li
              onClick={onLogoutClick}
              className="md:hidden text-gray-200 text-2xl p-2 cursor-pointer hover:text-orange-400 hover:scale-110 transition"
            >
              <AiOutlineLogin />
            </li>
          </>
        ) : (
          <>
            {/* Login */}
            <li className="hidden md:block">
              <Link
                href="/login"
                className="text-gray-200 text-lg px-4 py-2 rounded-md hover:text-orange-400 hover:bg-orange-400/10 transition"
              >
                Вход
              </Link>
            </li>

            <li className="md:hidden">
              <Link
                href="/login"
                className="text-gray-200 text-2xl p-2 hover:text-orange-400 hover:scale-110 transition"
              >
                <AiOutlineLogin />
              </Link>
            </li>

            {/* Register */}
            <li className="hidden md:block">
              <Link
                href="/register"
                className="text-gray-200 text-lg px-4 py-2 rounded-md hover:text-orange-400 hover:bg-orange-400/10 transition"
              >
                Регистрация
              </Link>
            </li>

            <li className="md:hidden">
              <Link
                href="/register"
                className="text-gray-200 text-2xl p-2 hover:text-orange-400 hover:scale-110 transition"
              >
                <FaRegistered />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
