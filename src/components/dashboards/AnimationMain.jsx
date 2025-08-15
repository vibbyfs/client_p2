import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo } from "react";

export default function AnimationMain() {
  const shouldReduceMotion = useReducedMotion();
  const bubbles = useMemo(
    () => [
      {
        delay: 0,
        y: 8,
        size: "w-20 h-20",
        blur: "blur-xl",
        opacity: "opacity-30",
      },
      {
        delay: 0.2,
        y: 12,
        size: "w-28 h-28",
        blur: "blur-2xl",
        opacity: "opacity-20",
      },
      {
        delay: 0.35,
        y: 10,
        size: "w-16 h-16",
        blur: "blur-xl",
        opacity: "opacity-30",
      },
    ],
    []
  );

  function MockPhoneMessage({ i, sender, text, align = "left", me, bot }) {
    const toneClass = me
      ? "bg-orange-600 text-white ml-auto"
      : bot
      ? "bg-orange-50 text-orange-900 border border-orange-100"
      : "bg-white text-neutral-900 border border-neutral-200";
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: i * 0.05 }}
        className={`max-w-[80%] rounded-2xl px-3 py-2 ${toneClass} ${
          align === "right" ? "ml-auto" : ""
        }`}
      >
        {!me && (
          <p className="mb-0.5 text-[10px] font-medium text-neutral-500">
            {bot ? "Remindly" : sender}
          </p>
        )}
        <p className="leading-relaxed text-[12px] sm:text-[13px]">{text}</p>
      </motion.div>
    );
  }

  return (
    <section className="relative order-2 overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm sm:p-8 lg:order-1 lg:p-10">
      {/* Background gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -left-10 h-44 w-44 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-orange-300/30 blur-3xl" />
      </div>

      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-content-center rounded-xl bg-orange-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Akun baru, pengingat makin hangat
          </h2>
          <p className="text-sm text-neutral-600">
            Daftar dalam hitungan detik. Cukup nomor WhatsApp dan email.
          </p>
        </div>
      </div>

      {/* Floating chat preview */}
      <div className="relative mt-6 grid gap-4 sm:mt-8">
        <MockPhoneMessage
          i={1}
          sender="Teman"
          text="Jangan lupa briefing besok ya 🙌"
          align="left"
        />
        <MockPhoneMessage
          i={2}
          sender="Aku"
          text="Oke! Ingatkan aku besok 08:30 sebelum berangkat."
          align="right"
          me
        />
        <MockPhoneMessage
          i={3}
          sender="Remindly"
          text="Siap. Aku setel pengingat besok 08:30 dengan nada yang hangat."
          align="left"
          bot
        />
      </div>

      {/* Soft animated bubbles */}
      <div className="pointer-events-none relative mt-8 h-28 w-full">
        {bubbles.map((b, idx) => (
          <motion.div
            key={idx}
            initial={shouldReduceMotion ? false : { y: 0 }}
            animate={shouldReduceMotion ? false : { y: [0, -b.y, 0] }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full bg-orange-300/30 ${b.size} ${b.blur} ${b.opacity}`}
            style={{ left: `${20 + idx * 28}%` }}
          />
        ))}
      </div>

      {/* Reassurance */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-orange-600" /> Enkripsi
          in‑transit
        </span>
        <span className="inline-flex items-center gap-1">
          <PhoneCall className="h-4 w-4 text-orange-600" /> Berbasis WhatsApp
        </span>
      </div>
    </section>
  );
}
