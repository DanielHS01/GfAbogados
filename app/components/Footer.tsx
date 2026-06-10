import Link from "next/link";
import { LuMapPin, LuPhone, LuMail } from "react-icons/lu";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050B1A] text-slate-400 pt-16 pb-8 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-900">
          {/* BRANDING */}
          <div className="md:col-span-5 flex flex-col items-start space-y-5">
            <div className="flex items-center gap-3">
              <Link href="/#inicio">
                <Image
                  src="/Images/Logo.png"
                  alt="Logo"
                  width={200}
                  height={100}
                />
              </Link>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Defendemos tus derechos con profesionalismo y compromiso. 5 años
              de experiencia brindando soluciones legales efectivas en Colombia.
            </p>

            {/* REDES SOCIALES */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1HAiG4HHxa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook GFA Abogados"
                className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600/10 transition-all duration-200"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/gfabogadoscol/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram GFA Abogados"
                className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600/10 transition-all duration-200"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ENLACES RÁPIDOS */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2.5 text-sm">
              {["Inicio", "Servicios", "Nosotros", "Agendar Cita"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/#${item.toLowerCase().replace(" ", "")}`}
                      className="hover:text-cyan-400 transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 group">
                <LuMapPin className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  Calle 8 # 4-88, Oficina 201, Edificio Asturias, Facatativá
                </span>
              </li>

              <li className="flex items-center gap-3 group">
                <LuPhone className="h-5 w-5 text-cyan-400 shrink-0" />
                <a
                  href="tel:+573125373231"
                  className="text-slate-300 group-hover:text-white transition-colors"
                >
                  +57 3125373231
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <LuMail className="h-5 w-5 text-cyan-400 shrink-0" />
                <a
                  href="mailto:contacto@lexabogados.co"
                  className="text-slate-300 group-hover:text-white transition-colors break-all"
                >
                  camilogarcia_@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 tracking-wide">
          <p>
            &copy; {currentYear} GF Abogados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
