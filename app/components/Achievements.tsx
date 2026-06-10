'use client';

import { useEffect, useRef, useState } from 'react';
import { FiAward } from "react-icons/fi";
import { HiOutlineUserGroup, HiOutlineShieldCheck } from "react-icons/hi2";
import { LuTrendingUp } from "react-icons/lu";

interface StatItem {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
  delayClass: string;
}

export default function StatsSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      id: 1,
      value: "5+",
      label: "Años de Experiencia",
      icon: <FiAward className="h-7 w-7 sm:h-8 sm:w-8" />,
      delayClass: "delay-100",
    },
    {
      id: 2,
      value: "150+",
      label: "Clientes Satisfechos",
      icon: <HiOutlineUserGroup className="h-7 w-7 sm:h-8 sm:w-8" />,
      delayClass: "delay-200",
    },
    {
      id: 3,
      value: "95%",
      label: "Casos Exitosos",
      icon: <HiOutlineShieldCheck className="h-7 w-7 sm:h-8 sm:w-8" />,
      delayClass: "delay-300",
    },
    {
      id: 4,
      value: "100%",
      label: "Compromiso",
      icon: <LuTrendingUp className="h-7 w-7 sm:h-8 sm:w-8" />,
      delayClass: "delay-400",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Control dinámico de entrada y salida para scroll ascendente y descendente
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="nosotros"
      className="relative bg-[#0B132B] py-16 md:py-24 overflow-hidden border-b border-slate-800/60"
    >
      
      {/* Sutil reflejo de luz azul de fondo para dar profundidad */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none transition-opacity duration-1000 ease-out
        ${isIntersecting ? "opacity-10" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* GRILLA DE ESTADÍSTICAS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 text-center">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className={`flex flex-col items-center group transition-all duration-700 ease-out transform will-change-transform ${stat.delayClass}
                ${isIntersecting ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
            >
              
              {/* CONTENEDOR DEL ICONO */}
              <div className="text-cyan-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] mb-4">
                {stat.icon}
              </div>

              {/* VALOR NUMÉRICO */}
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {stat.value}
              </span>

              {/* DESCRIPCIÓN / ETIQUETA */}
              <span className="mt-2 text-xs sm:text-sm md:text-base text-slate-400 font-medium tracking-wide max-w-45">
                {stat.label}
              </span>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}