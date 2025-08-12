import {
  Check,
  MessageSquareText,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  function ChatBubble({ me, bot, sender = "Aku", text }) {
    const toneClass = me
      ? "bg-orange-600 text-white ml-auto"
      : bot
      ? "bg-orange-50 text-orange-900 border border-orange-100"
      : "bg-white text-neutral-900 border border-neutral-200";
    return (
      <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${toneClass}`}>
        {!me && (
          <p className="mb-0.5 text-[10px] font-medium text-neutral-500">
            {bot ? "TemanIngat" : sender}
          </p>
        )}
        <p className="leading-relaxed">{text}</p>
      </div>
    );
  }

  return (
    <section id="home" className="overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-12 sm:gap-10 sm:px-6 md:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs text-orange-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Social Reminder via WhatsApp +
            AI
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Pengingat yang hangat,{" "}
            <span className="text-orange-600">sehangat orangnya</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
            TemanIngat membantu kamu mengatur janji, to‑do, dan follow‑up—untuk
            diri sendiri maupun ke teman—cukup lewat WhatsApp. AI kami paham
            bahasa natural dan menjaga nada komunikasi tetap personal.
          </p>

          {/* CTA form */}
          <form
            onSubmit={onSubmit}
            className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email kamu"
              className="w-full flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-orange-500/20 placeholder:text-neutral-400 focus:border-orange-500 focus:ring"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              {submitted ? (
                <Check className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}{" "}
              {submitted ? "Masuk Daftar" : "Join Waitlist"}
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-sm text-orange-700">
              Terima kasih! Kami akan kabari saat TemanIngat siap di WhatsApp
              kamu. ✨
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-neutral-500 sm:gap-4">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" /> Privasi terjaga
            </div>
            <div className="flex items-center gap-1">
              <Smile className="h-4 w-4" /> Nada personal
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareText className="h-4 w-4" /> Berbasis WhatsApp
            </div>
          </div>
        </motion.div>

        {/* Mock phone preview */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid place-items-center"
        >
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-orange-200 via-orange-400 to-orange-200 opacity-30 blur-xl" />
            <div className="relative rounded-[28px] border border-neutral-200 bg-white p-4 shadow-xl">
              <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-2 w-10 rounded bg-neutral-200" />
                  <div className="h-2 w-16 rounded bg-neutral-200" />
                </div>
                <div className="space-y-2 text-[11px] sm:text-[12px]">
                  <ChatBubble
                    sender="Teman"
                    text="Hai! Jadi besok kita latihan presentasi?"
                  />
                  <ChatBubble
                    me
                    text="Ingatkan aku besok 19:00 latihan presentasi bareng @Rina ya 🙏"
                  />
                  <ChatBubble
                    bot
                    text="Siap! Aku setel pengingat besok, Jumat 19:00 untuk kamu & Rina. Mau tambah catatan?"
                  />
                  <ChatBubble
                    me
                    text="Catatan: bawa pointer & print handout."
                  />
                  <ChatBubble
                    bot
                    text="Noted. Aku kirimkan pengingat dengan nada yang hangat. 👍"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
