import Navbar from "../../components/publics/Navbar";
import FAQ from "../../components/publics/Faq";
import Footer from "../../components/publics/Footer";
import { HeroSection } from "../../components/publics/HeroSection";
import FeatureSection from "../../components/publics/FeatureSection";
import { HowItWorksSetion } from "../../components/publics/HowItWorksSection";
import { CtaSection } from "../../components/publics/CtaSection";
import PricingAnchor from "../../components/publics/PricingAnchor";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white text-neutral-800">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSetion />
      <PricingAnchor />
      <CtaSection />
      <FAQ />
      <Footer />
    </div>
  );
}
