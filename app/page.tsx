import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import Process from "@/app/components/Process";
import AboutSection from "./components/AboutSection";
import Footer from "@/app/components/Footer";
import ContactForm from "./components/ContactForm";
import Achievements from "./components/Achievements";
import BlogSection from "@/app/components/BlogSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <AboutSection />
      <Achievements />
      <BlogSection />
      <ContactForm />
    </>
  );
}
