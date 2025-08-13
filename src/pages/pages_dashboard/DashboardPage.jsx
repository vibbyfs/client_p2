import { motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  MoreVertical,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function DashboardCMSPage() {
  const shouldReduceMotion = useReducedMotion();
  const stats = [
    {
      label: "Reminder Aktif",
      value: 8,
      icon: <BellRing className="h-5 w-5" />,
    },
    {
      label: "Dikirim Hari Ini",
      value: 12,
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      label: "Akan Datang",
      value: 5,
      icon: <CalendarClock className="h-5 w-5" />,
    },
    { label: "Teman", value: 23, icon: <Users className="h-5 w-5" /> },
  ];
  return (
    <>
      <div className="min-h-screen bg-neutral-50 text-neutral-800">
        <div className="lg:pl-64">
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <section className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                    Halo, <span className="text-orange-700">{name}</span> 👋
                  </h1>
                  <p className="text-sm text-neutral-700">
                    Ringkasan aktivitas dan pengingatmu hari ini.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="/reminders"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4" /> Tambah Reminder
                  </a>
                  <a
                    href="/friends"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    <Users className="h-4 w-4" /> Lihat Teman
                  </a>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-orange-600" /> Privasi
                  terjaga
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquareText className="h-4 w-4 text-orange-600" />{" "}
                  Berbasis WhatsApp
                </span>
              </div>
            </section>

            <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-orange-700">
                      {s.icon}
                      <span className="text-sm font-medium text-neutral-800">
                        {s.label}
                      </span>
                    </div>
                    <MoreVertical className="h-4 w-4 text-neutral-400" />
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-neutral-900">
                    {s.value}
                  </p>
                </motion.div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
