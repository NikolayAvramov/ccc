"use client";

import Link from "next/link";
import { FaFacebookF, FaSnapchatGhost } from "react-icons/fa";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div>
          <h3 className="text-2xl font-bold text-orange-400 mb-3">
            Classic Car Center
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
          Открийте най-красивите класически автомобили в света.
          Домът на автомобилните шедьоври и редки ексклузивни модели.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Бързи препратки</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-orange-400 transition">
                Начална страница
              </Link>
            </li>
            <li>
              <Link
                href="/showroom"
                className="hover:text-orange-400 transition"
              >
                Шоурум
              </Link>
            </li>
            <li>
              <Link
                href="/my-garage"
                className="hover:text-orange-400 transition"
              >
                Моят гараж
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="hover:text-orange-400 transition"
              >
                Профил
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Поддръжка</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                За нас
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Контакт
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Условия
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Политика за поверителност
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Следвайте ни</h4>
          <div className="flex gap-3 mt-2">
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-orange-400 hover:text-black transition">
              <AiFillInstagram />
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-orange-400 hover:text-black transition">
              <FaSnapchatGhost />
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-orange-400 hover:text-black transition">
              <AiOutlineTwitter />
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-orange-400 hover:text-black transition">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2024 Classic Car Center • Created by Nikolay Avramov
      </div>
    </footer>
  );
}
