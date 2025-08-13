import {
  BellRing,
  CalendarClock,
  Edit,
  LogOut,
  Menu,
  Plus,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [open]);

  const items = [
    {
      label: "Dashboard",
      href: "/dashboards",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      label: "Reminder",
      href: "/dashboards/reminders",
      icon: <BellRing className="h-4 w-4" />,
    },
    {
      label: "Teman",
      href: "/dashboards/friends",
      icon: <Users className="h-4 w-4" />,
    },
    { label: "Profil", href: "/profile", icon: <Edit className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Mobile top bar with menu button */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-orange-100 bg-white px-4 py-3 shadow-sm lg:hidden">
        <button
          aria-label="Buka menu"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <a href="/dashboard" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-orange-600 text-white">
            <BellRing className="h-5 w-5" />
          </div>
          <span className="font-semibold">Remindly</span>
        </a>
        <span className="text-sm text-neutral-500">Pro</span>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-orange-100 bg-white pt-4 shadow-sm lg:flex">
        <div className="flex items-center gap-2 px-4">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-orange-600 text-white">
            <BellRing className="h-5 w-5" />
          </div>
          <span className="font-semibold">Remindly</span>
        </div>
        <nav className="mt-4 grid gap-1 px-2">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-800 hover:bg-orange-50"
            >
              <span className="text-orange-600">{it.icon}</span>
              <span>{it.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto grid gap-2 px-2 pb-4">
          <a
            href="/reminders"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" /> Buat Reminder
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            <Settings className="h-4 w-4" /> Pengaturan
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            <LogOut className="h-4 w-4" /> Keluar
          </a>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed left-0 top-0 z-50 h-full w-[86%] max-w-xs bg-white shadow-xl transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-content-center rounded-lg bg-orange-600 text-white">
                <BellRing className="h-4 w-4" />
              </div>
              <span className="font-semibold">Remindly</span>
            </div>
            <button
              aria-label="Tutup menu"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="grid gap-1 p-3">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                className="rounded-lg px-3 py-2 text-base text-neutral-800 hover:bg-orange-50"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
            <a
              href="/reminders"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white shadow-sm"
            >
              <Plus className="h-4 w-4" /> Buat Reminder
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
