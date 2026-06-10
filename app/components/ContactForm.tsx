'use client';

import { useEffect, useRef, useState } from 'react';
import { RiSendPlane2Line } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Control dinámico de entrada y salida continua
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.10,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          email: formData.get('email'),
          telefono: formData.get('telefono'),
          mensaje: formData.get('mensaje'),
        }),
      });

      if (response.ok) {
        alert('Consulta enviada con éxito. Nos comunicaremos contigo a la brevedad.');
        form.reset();
      } else {
        alert('Ocurrió un error al enviar el formulario.');
      }
    } catch (error) {
      alert('Ocurrió un error de red al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contacto" 
      className="bg-slate-100 py-20 md:py-28 border-t border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className={`text-center mb-12 transition-all duration-700 ease-out transform will-change-transform
          ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Agenda tu Consulta Legal
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Cuéntanos tu caso y un abogado experto te brindará la asesoría que necesitas.
          </p>
        </div>

        {/* CONTENEDOR DEL FORMULARIO */}
        <div className={`bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50
          transition-all duration-800 ease-out delay-100 transform will-change-transform
          ${isIntersecting ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* CAMPO: NOMBRE */}
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="text-sm font-semibold text-slate-700 tracking-wide">
                  Nombre completo <span className="text-blue-600">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm font-medium"
                />
              </div>

              {/* CAMPO: TELÉFONO */}
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className="text-sm font-semibold text-slate-700 tracking-wide">
                  Número de teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm font-medium"
                />
              </div>
            </div>

            {/* CAMPO: CORREO ELECTRÓNICO */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 tracking-wide">
                Correo electrónico <span className="text-blue-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="juan.perez@ejemplo.com"
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm font-medium"
              />
            </div>

            {/* CAMPO: MENSAJE */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mensaje" className="text-sm font-semibold text-slate-700 tracking-wide">
                Detalles de tu caso o consulta <span className="text-blue-600">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Describe brevemente tu situación legal para asignarte al especialista correcto..."
                required
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-sm font-medium resize-none leading-relaxed"
              />
            </div>

            {/* BOTÓN DE ENVÍO */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 disabled:bg-blue-600/80 rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-600/10 active:scale-98 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <BiLoaderAlt className="h-5 w-5 animate-spin" />
                    <span>Procesando consulta...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <RiSendPlane2Line className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}