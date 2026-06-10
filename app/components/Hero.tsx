'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Hero() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/Images/Hero.jpg')",
        }}
      />

      {/* OVERLAY OSCURO */}
      <div className="absolute inset-0 bg-[#010a1f]/85" />

      {/* EFECTO DEGRADADO LATERAL */}
      <div className="absolute inset-0 bg-linear-to-r from-[#010a1f]/95 via-[#010a1f]/85 to-[#010a1f]/60" />

      {/* EFECTO DE LUZ */}
      <div className="absolute top-0 right-0 w-175 h-175 bg-blue-500/10 rounded-full blur-3xl" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* TITULO */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight transition-all duration-1000
            ${
              isIntersecting
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Soluciones legales{' '}
            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              efectivas
            </span>
            <br />
            para ti y tu empresa
          </h1>

          {/* SUBTITULO */}
          <p
            className={`mt-8 text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed transition-all duration-1000 delay-150
            ${
              isIntersecting
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            Asesoría jurídica estratégica, cercana y confiable en derecho
            penal, disciplinario, corporativo, familiar y laboral.
          </p>

          {/* MENSAJES DE CONFIANZA */}
          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all duration-1000 delay-200
            ${
              isIntersecting
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm">
              Primera consulta gratis
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm">
              Atención personalizada
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm">
              Más de 5 años de experiencia
            </span>
          </div>

          {/* BOTONES */}
          <div
            className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300
            ${
              isIntersecting
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              href="/#contacto"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all"
            >
              Agendar consulta gratis

              <div className="bg-white/10 p-2 rounded-full">
                <FiArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}