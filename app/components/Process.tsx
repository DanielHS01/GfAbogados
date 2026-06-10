'use client';

import { useEffect, useRef, useState } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  delayClass: string;
}

export default function Process() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stepsList: Step[] = [
    {
      number: "1",
      title: "Agenda tu Cita",
      description: "Escoge el día y hora que mejor te convenga. Primera consulta sin costo.",
      delayClass: "delay-100",
    },
    {
      number: "2",
      title: "Evaluamos tu Caso",
      description: "Analizamos tu situación y te explicamos las mejores opciones de forma clara.",
      delayClass: "delay-300",
    },
    {
      number: "3",
      title: "Te Acompañamos",
      description: "Representamos tus intereses hasta lograr la solución que mereces.",
      delayClass: "delay-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cambia dinámicamente según si está o no en pantalla
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px", // Margen equilibrado para la salida y re-entrada
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
      className="bg-[#0A0F1D] py-20 md:py-28 border-t border-slate-900 relative overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ease-out transform will-change-transform
          ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            ¿Cómo te ayudamos?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Un proceso simple y transparente para resolver tu situación legal
          </p>
        </div>

        {/* CONTENEDOR DE PASOS */}
        <div className="relative">
          
          {/* LÍNEA DE CONEXIÓN */}
          <div className={`absolute left-7.75 md:left-0 top-8 md:top-7 bottom-8 md:bottom-auto w-0.5 md:w-full md:h-0.5 bg-linear-to-b md:bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 pointer-events-none transition-all duration-1000 ease-out delay-500 origin-left transform
            ${isIntersecting ? "scale-100 opacity-30" : "scale-0 opacity-0"}`} 
          />

          {/* GRILLA DE PASOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {stepsList.map((step, index) => (
              <div 
                key={index} 
                className={`flex md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0 group
                  transition-all duration-700 ease-out transform will-change-transform ${step.delayClass}
                  ${isIntersecting ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
              >
                <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white bg-linear-to-br from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/20 group-hover:shadow-cyan-500/30 group-hover:scale-110 md:mb-6 transition-all duration-300 ring-4 ring-[#0A0F1D]">
                  {step.number}
                </div>

                <div className="flex-col">
                  <h3 className="text-xl font-bold text-white tracking-wide mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}