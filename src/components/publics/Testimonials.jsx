import { Check, Users } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8">
            <h3 className="text-lg font-bold text-neutral-900 sm:text-xl">
              Kenapa orang suka TemanIngat?
            </h3>
            <p className="mt-2 text-sm text-neutral-700 sm:text-base">
              Karena rasanya seperti dibantu teman: sopan, tepat waktu, dan
              nggak menggurui.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-600" /> Nada pengingat
                yang hangat
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-600" /> Paham bahasa
                natural
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-600" /> Mudah untuk ajak
                teman
              </li>
            </ul>
          </div>

          {/* Dua kartu testimoni */}
          {[
            {
              name: "Rina",
              role: "Content Strategist",
              quote:
                "Akhirnya nggak ada lagi ‘lupa follow‑up’. Nada pengingatnya halus banget, teman pun nyaman.",
            },
            {
              name: "Bima",
              role: "Project Manager",
              quote:
                "Parser naturalnya jago. Janji lintas zona waktu pun beres—tim tetap sinkron.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-content-center rounded-full bg-orange-100 text-orange-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 sm:text-base">
                    {t.name}
                  </p>
                  <p className="text-xs text-neutral-600 sm:text-sm">
                    {t.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-700 sm:text-base">
                “{t.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
