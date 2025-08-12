import { ArrowRight, PhoneCall } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 text-center shadow-sm sm:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
          Siap punya pengingat yang manusiawi?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-700 sm:text-base">
          Hubungkan WhatsApp kamu, atur preferensi nada, dan biarkan TemanIngat
          menjaga momen penting—tanpa drama.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700 sm:w-auto"
          >
            <PhoneCall className="h-4 w-4" /> Hubungkan WhatsApp
          </a>
          <a
            href="#pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-800 hover:bg-neutral-50 sm:w-auto"
          >
            Lihat Paket <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
