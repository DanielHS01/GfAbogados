import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import WhatsAppButton from '@/app/components/WhatsappButton';

import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />

        {children}

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}