import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            Cara Kerja
          </h2>
        </div>
        <ol className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((step) => (
            <li
              key={step}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-content-center rounded-full bg-orange-600 text-sm font-bold text-white">
                  {step}
                </span>
                <p className="text-sm font-medium md:text-base">
                  {step === 1 && "Hubungkan WhatsApp"}
                  {step === 2 && "Kirim pesan natural"}
                  {step === 3 && "Kami ingatkan tepat waktu"}
                </p>
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                {step === 1 &&
                  "Klik ‘Hubungkan WhatsApp’, verifikasi nomor, dan izinkan pengingat."}
                {step === 2 &&
                  "Contoh: ‘ingatkan aku besok 08:00 ambil paket di lobby’, atau tag teman untuk barengan."}
                {step === 3 &&
                  "Kami kirim pengingat dengan nada personal sesuai preferensi kamu & teman."}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-6 text-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700"
          >
            Coba Sekarang <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
