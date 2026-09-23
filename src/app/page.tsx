import { BookingForm } from "@/components/BookingForm";
import { Faq } from "@/components/Faq";
import { FloatingUI } from "@/components/FloatingUI";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Itinerary } from "@/components/Itinerary";
import { Overview } from "@/components/Overview";
import { Pricing } from "@/components/Pricing";
import { SplashScreen } from "@/components/SplashScreen";
import { Testimonials } from "@/components/Testimonials";

export default function Page() {
  return (
    <>
      <SplashScreen />
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-[var(--color-emerald-brand)] focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to booking
      </a>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Itinerary />
        <Highlights />
        <Pricing />
        <Gallery />
        <Testimonials />
        <BookingForm />
        <Faq />
      </main>
      <Footer />
      <FloatingUI />
    </>
  );
}
