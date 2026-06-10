'use client';

import { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { FaScaleBalanced, FaBuildingShield } from "react-icons/fa6";
import { HiUserGroup, HiOutlineShieldCheck } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delayClass: string;
}

export default function Services() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const servicesList: ServiceCard[] = [
    {
      id: "derecho-penal",
      title: "Derecho Penal",
      description:
        "Defensa y representación en procesos penales, investigaciones, audiencias y juicios.",
      icon: <HiOutlineShieldCheck className="h-6 w-6" />,
      delayClass: "delay-100",
    },
    {
      id: "derecho-disciplinario",
      title: "Derecho Disciplinario",
      description:
        "Asesoría y defensa en investigaciones disciplinarias ante entidades públicas y organismos de control.",
      icon: <HiOutlineShieldCheck className="h-6 w-6" />,
      delayClass: "delay-200",
    },
    {
      id: "derecho-corporativo",
      title: "Derecho Corporativo",
      description:
        "Acompañamiento legal empresarial, contratos comerciales y cumplimiento normativo.",
      icon: <FaBuildingShield className="h-6 w-6" />,
      delayClass: "delay-300",
    },
    {
      id: "derecho-familiar",
      title: "Derecho Familiar",
      description:
        "Procesos de divorcio, custodia, alimentos, sucesiones y protección de los derechos familiares.",
      icon: <HiUserGroup className="h-6 w-6" />,
      delayClass: "delay-100 md:delay-400 lg:delay-100",
    },
    {
      id: "derecho-laboral",
      title: "Derecho Laboral",
      description:
        "Representación en conflictos laborales, despidos, indemnizaciones y seguridad social.",
      icon: <FaScaleBalanced className="h-6 w-6" />,
      delayClass: "delay-200 md:delay-500 lg:delay-200",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
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
      id="servicios"
      className="bg-slate-100 py-20 md:py-28 relative border-t border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ENCABEZADO */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out transform will-change-transform
          ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nuestras Áreas de Especialización
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Representación y asesoría jurídica especializada para personas,
            familias y empresas.
          </p>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service) => {
            const isVisibleClasses = isIntersecting
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-[0.98]";

            return (
              <div
                key={service.id}
                className={`group bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm
                transition-all duration-700 ease-out transform will-change-transform
                ${service.delayClass} ${isVisibleClasses}
                hover:border-slate-300 hover:-translate-y-1.5 hover:scale-[1.01]
                hover:shadow-xl hover:shadow-slate-200/80`}
              >
                <div>

                  {/* ICONO */}
                  <div
                    className="inline-flex p-3 rounded-xl bg-slate-100 text-slate-600 shadow-sm mb-6
                    group-hover:bg-blue-600 group-hover:text-white
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300 ease-out"
                  >
                    {service.icon}
                  </div>

                  {/* TITULO */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-wide group-hover:text-blue-600 transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>

                  {/* DESCRIPCION */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* BOTON */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/servicios/${service.id}`}
                    className="inline-flex items-center text-sm font-semibold text-slate-500 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Consultar caso

                    <GoArrowRight
                      className="ml-1.5 h-4 w-4 transform group-hover:translate-x-1
                      transition-transform duration-300 ease-out"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}