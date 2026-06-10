'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

interface ArticleCard {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  isFeatured?: boolean;
  delayClass: string; // Retraso para la secuencia escalonada
}

export default function BlogSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const articles: ArticleCard[] = [
    {
      id: "guia-apoyos",
      title: "¿Cómo solicitar una valoración de apoyos en Colombia?",
      description: "Conozca los pasos esenciales y los requisitos legales para iniciar este proceso de protección de la autonomía.",
      href: "#articulos",
      imageSrc: "/Images/ValoracionApoyo.jpg",
      delayClass: "delay-100",
    },
    {
      id: "blindaje-corporativo",
      title: "Claves para blindar los contratos de tu empresa",
      description: "Evite los vacíos legales más comunes que pueden poner en riesgo el patrimonio y la estabilidad de su negocio.",
      href: "#articulos",
      imageSrc: "/Images/Contratos.jpg",
      isFeatured: true,
      delayClass: "delay-200 lg:delay-300",
    },
    {
      id: "resolucion-conflictos",
      title: "Ventajas de la conciliación extrajudicial",
      description: "Descubra cómo resolver disputas comerciales y civiles de manera rápida, económica y con plena validez legal.",
      href: "#articulos",
      imageSrc: "/Images/Conciliacion.jpg",
      delayClass: "delay-300 lg:delay-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Monitoreo bidireccional continuo (subir y bajar scroll)
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px",
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
      id="educacion" 
      className="bg-white py-20 md:py-28 border-t border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ease-out transform will-change-transform
          ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
              Educación legal para tomar <br />
              <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent font-extrabold">
                mljores decisiones
              </span>
            </h2>
          </div>
          <div>
            <Link
              href="#noticias"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full shadow-sm hover:shadow-lg active:scale-98 transition-all duration-200 text-center"
            >
              Ver más artículos
            </Link>
          </div>
        </div>

        {/* CONTENEDOR DE TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {articles.map((article) => {
            const isVisibleClasses = isIntersecting 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-12 scale-[0.97]";

            if (article.isFeatured) {
              /* TARJETA CENTRAL DESTACADA (Azul profundo) */
              return (
                <div
                  key={article.id}
                  className={`group relative bg-[#0B132B] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between 
                    transition-all duration-700 ease-out transform will-change-transform ${article.delayClass} ${isVisibleClasses}
                    hover:scale-[1.02] hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-900/20`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide mb-3 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {article.description}
                      </p>
                    </div>
                    
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 w-full border border-slate-800">
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link
                      href={article.href}
                      className="bg-slate-800 text-white group-hover:bg-blue-600 p-3 rounded-full transition-all duration-300 flex items-center justify-center shadow-md border border-slate-700 group-hover:border-blue-500"
                    >
                      <FiArrowUpRight className="h-5 w-5 transform group-hover:rotate-45 transition-transform duration-300 ease-out" />
                    </Link>
                  </div>
                </div>
              );
            }

            /* TARJETAS LATERALES (Estilo claro con base gris suave) */
            return (
              <div
                key={article.id}
                className={`group flex flex-col justify-between bg-white border border-slate-200 rounded-3xl p-6 
                  transition-all duration-700 ease-out transform will-change-transform ${article.delayClass} ${isVisibleClasses}
                  hover:border-slate-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-100`}
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 w-full border border-slate-100 mb-6">
                    <Image
                      src={article.imageSrc}
                      alt={article.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-wide mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <Link
                    href={article.href}
                    className="bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white p-3 rounded-full transition-all duration-300 flex items-center justify-center shadow-sm"
                  >
                    <FiArrowUpRight className="h-5 w-5 transform group-hover:rotate-45 transition-transform duration-300 ease-out" />
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