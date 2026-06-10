'use client';

import { useEffect, useRef, useState } from 'react';
import { RiSendPlane2Line } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";

// Definición de la estructura de errores
interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  // Función de validación del lado del cliente
  const validateForm = (data: { nombre: string; email: string; telefono: string; mensaje: string }): FormErrors => {
    const newErrors: FormErrors = {};
    
    // RegEx para emails estructurados correctamente
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // RegEx opcional para teléfonos (permite números, espacios, +, y guiones si se digita algo)
    const phoneRegex = /^[0-9+\s-]*$/;

    // Validación: Nombre
    if (!data.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es requerido.';
    } else if (data.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    // Validación: Email
    if (!data.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }

    // Validación: Teléfono (Opcional, pero si se escribe, debe ser válido)
    if (data.telefono && !phoneRegex.test(data.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido (solo números, espacios, + o -).';
    }

    // Validación: Mensaje
    if (!data.mensaje.trim()) {
      newErrors.mensaje = 'Los detalles del caso son requeridos.';
    } else if (data.mensaje.trim().length < 20) {
      newErrors.mensaje = 'Por favor, describe tu caso con un poco más de detalle (mínimo 20 caracteres).';
    }

    return newErrors;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      mensaje: formData.get('mensaje') as string,
    };

    // Validar antes de disparar el fetch
    const validationErrors = validateForm(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Hace scroll sutil al primer error visible si es necesario
      return;
    }

    // Si pasa las validaciones, limpiamos errores previos y procesamos
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
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
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 text-sm font-medium ${
                    errors.nombre 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                  }`}
                />
                {errors.nombre && (
                  <span className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.nombre}</span>
                )}
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
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 text-sm font-medium ${
                    errors.telefono 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                  }`}
                />
                {errors.telefono && (
                  <span className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.telefono}</span>
                )}
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
                className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 text-sm font-medium ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                }`}
              />
              {errors.email && (
                <span className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.email}</span>
              )}
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
                className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 text-sm font-medium resize-none leading-relaxed ${
                  errors.mensaje 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                }`}
              />
              {errors.mensaje && (
                <span className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.mensaje}</span>
              )}
            </div>

            {/* BOTÓN DE ENVÍO */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group hover:cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 disabled:bg-blue-600/80 rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-600/10 active:scale-98 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-200"
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