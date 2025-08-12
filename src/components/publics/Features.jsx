import { motion, useReducedMotion } from "framer-motion";
import { BellRing, Bot, Clock, ShieldCheck, Sparkles, Users } from "lucide-react";

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
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: <Bot className="h-6 w-6" aria-hidden />,
              title: "AI Parsing Cerdas",
              desc: "Ketik natural: ‘ingatkan aku besok 08:00 ambil paket’. AI paham tanggal relatif dan konteks.",
            },
            {
              icon: <BellRing className="h-6 w-6" aria-hidden />,
              title: "Reminder ke Diri & Teman",
              desc: "Tag teman atau kirim langsung ke kontak—nada tetap sopan dan personal.",
            },
            {
              icon: <Users className="h-6 w-6" aria-hidden />,
              title: "Manajemen Teman Lengkap",
              desc: "Kelola teman, izin, grup kecil, dan preferensi jam lintas zona waktu.",
            },
            {
              icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
              title: "Privasi Terjaga",
              desc: "Enkripsi in‑transit, kontrol data, dan opsi auto‑delete untuk percakapan sensitif.",
            },
            {
              icon: <Sparkles className="h-6 w-6" aria-hidden />,
              title: "Nada Personal & Hangat",
              desc: "Template pesan humanis yang bisa diatur sesuai kepribadian.",
            },
            {
              icon: <Clock className="h-6 w-6" aria-hidden />,
              title: "Pintar Zona Waktu",
              desc: "Janji lintas kota? Waktu otomatis disesuaikan agar tepat momen.",
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-orange-50 p-2 text-orange-700">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-neutral-900 md:text-lg">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
