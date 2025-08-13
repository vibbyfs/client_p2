import { BellRing, Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Links } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-orange-600 text-white shadow-sm">
            <BellRing className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">TemanIngat</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {[
            { label: "Fitur", href: "#features" },
            { label: "Cara Kerja", href: "#how-it-works" },
            { label: "FAQ", href: "#faq" },
          ].map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm text-neutral-700 transition hover:text-orange-700"
            >
              {n.label}
            </a>
          ))}
          <Link to="/login">
            <button className="inline-flex items-center gap-2 rounded-xl border border-orange-600 px-3 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-50 cursor-pointer">
              <PhoneCall className="h-4 w-4" /> Login
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Buka menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm bg-white shadow-xl transition-transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-content-center rounded-lg bg-orange-600 text-white">
                <BellRing className="h-4 w-4" />
              </div>
              <span className="font-semibold">TemanIngat</span>
            </div>
            <button
              aria-label="Tutup menu"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 p-4">
            {[
              { label: "Fitur", href: "#features" },
              { label: "Cara Kerja", href: "#how-it-works" },
              { label: "Harga", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ].map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded-lg px-3 py-2 text-base text-neutral-800 hover:bg-neutral-50"
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-orange-700"
            >
              <PhoneCall className="h-4 w-4" /> Hubungkan WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
