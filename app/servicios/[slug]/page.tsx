import { services } from '@/app/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  HiCheck,
  HiOutlinePhone,
  HiOutlineArrowLeft,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen pb-20">

      {/* HERO */}
      <section className="bg-[#0B132B] overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center">

          {/* TEXTO */}
          <div className="px-6 lg:px-12 py-14 lg:py-20">

            <Link
              href="/#servicios"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors mb-8"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Volver a Servicios
            </Link>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              {service.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              {service.shortDescription}
            </p>
          </div>

          {/* IMAGEN
          <div className="h-75 md:h-105 lg:h-full">
            <img
              src={`/Images/services/${service.slug}.jpg`}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          */}

        </div>
      </section>

      {/* CONTENIDO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-8">

            {/* INTRODUCCIÓN */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm">

              <p className="text-lg text-slate-600 leading-relaxed">
                {service.content.introduction}
              </p>

              <hr className="my-8 border-slate-200" />

              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                ¿En qué te podemos ayudar?
              </h2>

              <div className="space-y-4">

                {service.content.benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 hover:border-blue-200 hover:bg-blue-50/40 transition-all"
                  >
                    <div className="shrink-0">
                      <HiCheck className="h-5 w-5 text-blue-600" />
                    </div>

                    <span className="text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              {/* CTA PRINCIPAL */}
              <div className="mt-8">

                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Consultar mi caso gratis
                </a>

              </div>

            </div>

            {/* FAQS */}
            {service.content.faqs?.length > 0 && (
              <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm">

                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Preguntas frecuentes
                </h2>

                <div className="space-y-6">
                  {service.content.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-slate-100 pb-6 last:border-0"
                    >
                      <h3 className="font-bold text-slate-900 mb-2">
                        {faq.question}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">

            <div className="sticky top-28 space-y-6">

              <div className="bg-[#0B132B] rounded-3xl p-8 text-white shadow-xl">

                <h3 className="text-2xl font-bold mb-4">
                  ¿Necesitas asesoría inmediata?
                </h3>

                <p className="text-slate-300 leading-relaxed mb-6">
                  Agenda una consulta con nuestros abogados y recibe atención personalizada.
                </p>

                <div className="space-y-3">

                  <a
                    href="https://wa.me/3125373231"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition-colors"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    WhatsApp
                  </a>

                  <Link
                    href="/#contacto"
                    className="w-full flex items-center justify-center gap-2 py-3 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-200 hover:text-white transition-all"
                  >
                    <HiOutlinePhone className="h-5 w-5" />
                    Formulario
                  </Link>

                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                  <p className="text-xs text-slate-400">
                    Respuesta en menos de 24 horas hábiles.
                  </p>
                </div>

              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center shadow-sm">

                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Atención Nacional
                </span>

                <p className="mt-2 text-xl font-bold text-slate-900">
                  +57 3125373231
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Lunes a Viernes · 8:00 AM - 6:00 PM
                </p>

              </div>

            </div>

          </aside>

        </div>
      </section>
    </main>
  );
}