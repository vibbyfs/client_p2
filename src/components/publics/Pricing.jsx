import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            Harga yang Jelas
          </h2>
          <p className="mt-2 text-sm text-neutral-700 sm:text-base">
            Mulai gratis. Upgrade kapan saja sesuai kebutuhan.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Gratis",
              price: "Rp0",
              tagline: "Coba dulu tanpa kartu",
              cta: "Mulai Sekarang",
              popular: false,
              features: [
                "50 reminder/bulan",
                "Parsing bahasa natural",
                "Reminder ke diri sendiri",
                "Tema pesan hangat dasar",
              ],
            },
            {
              name: "Pro",
              price: "Rp49.000",
              tagline: "Untuk pengguna aktif",
              cta: "Upgrade ke Pro",
              popular: true,
              features: [
                "Tak terbatas wajar (FAIR)",
                "Reminder ke teman & grup",
                "Template pesan kustom",
                "Prioritas antrian WA",
              ],
            },
            {
              name: "Tim",
              price: "Rp199.000",
              tagline: "Untuk tim kecil & komunitas",
              cta: "Coba untuk Tim",
              popular: false,
              features: [
                "5 seat termasuk",
                "Panel manajemen teman",
                "Peran & izin",
                "Log aktivitas & export",
              ],
            },
          ].map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-6 shadow-sm ${
                t.popular
                  ? "border-orange-300 bg-gradient-to-b from-orange-50 to-white"
                  : "border-neutral-200 bg-white"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  Paling Populer
                </span>
              )}
              <h3 className="text-base font-bold sm:text-lg">{t.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">{t.tagline}</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-2xl font-extrabold sm:text-3xl">
                  {t.price}
                </span>
                <span className="text-sm text-neutral-500">/bulan</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-orange-600" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold shadow-sm transition ${
                  t.popular
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
