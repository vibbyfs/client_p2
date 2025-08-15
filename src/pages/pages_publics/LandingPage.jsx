import Navbar from "../../components/publics/Navbar";
import FAQ from "../../components/publics/Faq";
import Footer from "../../components/publics/Footer";
import { HeroSection } from "../../components/publics/HeroSection";
import FeatureSection from "../../components/publics/FeatureSection";
import { HowItWorksSetion } from "../../components/publics/HowItWorksSection";
import { CtaSection } from "../../components/publics/CtaSection";

function SkipLink() {
  return (
    <a
      href="#home"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-orange-600 focus:px-3 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
  );
}

function BackgroundOrnaments() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-32 right-[-20%] h-72 w-72 rounded-full bg-orange-200/30 blur-3xl md:-top-24 md:right-[-10%]" />
      <div className="absolute bottom-10 left-[-20%] h-72 w-72 rounded-full bg-orange-300/30 blur-3xl md:left-[-10%]" />
    </div>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[0_-1px_0_0_rgba(0,0,0,0.05)] md:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <a
          href="#cta"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white shadow-sm"
        >
          Mulai Gratis
        </a>
        <a
          href="#pricing"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-800"
        >
          Harga
        </a>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white text-neutral-800">
      <SkipLink />
      <BackgroundOrnaments />
      <Navbar />
      <HeroSection/>
      <FeatureSection />
      <HowItWorksSetion />
      <FAQ />
      <CtaSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
