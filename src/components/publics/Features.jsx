import { motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  Bot,
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import InfiniteMovingCardsFeatures from "./InfiniteMovingCardsFeatures";

export default function Features() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="features" className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            Fitur yang Bikin Tenang
          </h2>
          <p className="mt-3 text-sm text-neutral-700 sm:text-base">
            Dirancang untuk mengingatkan tanpa menggurui—pintar, sopan, dan pas
            timing‑nya.
          </p>
        </div>

        {/* <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 md:grid-cols-3"> */}
        <InfiniteMovingCardsFeatures />
        {/* </div> */}
      </div>
    </section>
  );
}
