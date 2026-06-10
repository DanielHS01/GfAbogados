"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#010a1f] border-b border-[#010a1f] fixed top-0 left-0 right-0 z-9999 shadow-lg">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <div className="shrink-0">
            <Link href="/#inicio">
              <Image
                src="/Images/Logo.png"
                alt="García Forero Abogados"
                width={170}
                height={70}
                priority
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-10">
            <Link
              href="/#inicio"
              className="text-sm font-semibold text-white hover:text-blue-300 transition-colors"
            >
              Inicio
            </Link>

            <Link
              href="/#servicios"
              className="text-sm font-medium text-slate-200 hover:text-blue-300 transition-colors"
            >
              Servicios
            </Link>

            <Link
              href="/#nosotros"
              className="text-sm font-medium text-slate-200 hover:text-blue-300 transition-colors"
            >
              Nosotros
            </Link>

            <Link
              href="/#contacto"
              className="text-sm font-medium text-slate-200 hover:text-blue-300 transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg transition-all duration-200"
            >
              Agenda tu Asesoría
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-blue-900 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú</span>

              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-[#010a1f] border-t border-[#010a1f]">

          <Link
            href="/#inicio"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-white bg-blue-600"
          >
            Inicio
          </Link>

          <Link
            href="/#servicios"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base text-slate-200 hover:bg-blue-900 transition-colors"
          >
            Servicios
          </Link>

          <Link
            href="/#nosotros"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base text-slate-200 hover:bg-blue-900 transition-colors"
          >
            Nosotros
          </Link>

          <Link
            href="/#contacto"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base text-slate-200 hover:bg-blue-900 transition-colors"
          >
            Contacto
          </Link>

          <div className="pt-4 border-t border-blue-900">
            <Link
              href="/#contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
            >
              Agenda tu Asesoría
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}