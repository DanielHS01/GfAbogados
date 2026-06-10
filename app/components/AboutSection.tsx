'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { HiCheck } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";
import imageSrc from "@/public/Images/Valoracion.jpg"; // Reemplaza por tu imagen corporativa

export default function AboutSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const highlights = [
    { text: "Ética y profesionalismo", delay: "delay-100" },
    { text: "Atención cercana y empática", delay: "delay-200" },
    { text: "Soluciones efectivas adaptadas a cada caso", delay: "delay-300" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="bg-white py-20 md:py-28 border-t border-slate-200 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* CONTENIDO */}
          <div
            className={`lg:col-span-6 flex flex-col items-start transition-all duration-1000 ease-out transform will-change-transform
            ${
              isIntersecting
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
              Sobre GF Abogados
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Comprometidos con tu tranquilidad y tus derechos
            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Somos un bufete moderno y especializado con más de 5 años de
              experiencia, brindando soluciones legales estratégicas,
              personalizadas y orientadas a resultados para personas,
              familias y empresas.
            </p>

            {/* LISTA DE VALORES */}
            <div className="mt-10 space-y-5 w-full">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500 ease-out transform ${item.delay}
                  ${
                    isIntersecting
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-blue-600 shadow-sm">
                    <HiCheck className="h-5 w-5" />
                  </div>

                  <span className="text-slate-700 font-medium text-base">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTÓN */}
            <div
              className={`mt-10 transition-all duration-700 ease-out transform
              ${
                isIntersecting
                  ? "opacity-100 translate-y-0 delay-500"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="#contacto"
                className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-[#010a1f] hover:bg-blue-900 rounded-xl shadow-lg transition-all duration-300"
              >
                Conoce más de nuestro equipo

                <GoArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* IMAGEN */}
          <div
            className={`lg:col-span-6 transition-all duration-1000 ease-out transform will-change-transform
            ${
              isIntersecting
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200">
              <div className="aspect-4/3 relative">
                <Image
                  src={imageSrc}
                  alt="GF Abogados"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Overlay elegante */}
              <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}