'use client';

import { FaWhatsapp } from 'react-icons/fa6'; // Actualizado a fa6 para consistencia

export default function WhatsAppButton() {
  const phone = '573001234567';
  const message = encodeURIComponent(
    'Hola, me gustaría recibir asesoría jurídica.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      
      {/* EFECTO DE ONDA PULSANTE (Anillo de expansión infinito) */}
      <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-green-500 opacity-60 pointer-events-none duration-1000" />

      {/* BOTÓN INTERACTIVO PRINCIPAL */}
      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-black/20 
          /* Transición suave multitransformación */
          transition-all duration-300 ease-out will-change-transform
          /* Micro-interacciones avanzadas en Hover */
          hover:scale-110 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/30 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        {/* ICONO CON MICRO-ROTACIÓN */}
        <FaWhatsapp 
          size={30} 
          className="transform group-hover:rotate-12 group-hover:scale-105 transition-transform duration-300 ease-out" 
        />
      </a>
    </div>
  );
}