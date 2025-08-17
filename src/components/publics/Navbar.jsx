import { BellRing, Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (menuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  // Close menu automatically when switching to desktop width
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Close on Escape and manage initial focus
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
      // Focus the close button when opening
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      window.removeEventListener("keydown", onKeyDown);
      // Return focus to toggle button when closing
      setTimeout(() => toggleBtnRef.current?.focus(), 0);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-green-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-green-600 text-white shadow-sm">
            <BellRing className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">HeyRemindly</span>
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
              className="text-sm text-neutral-700 transition hover:text-green-700"
            >
              {n.label}
            </a>
          ))}
          <Link to="/login">
            <button className="inline-flex items-center gap-2 rounded-xl border border-green-600 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 cursor-pointer">
              <PhoneCall className="h-4 w-4" /> Hubungkan Whatsapp
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Buka menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          ref={toggleBtnRef}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(true);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile drawer via portal to avoid stacking issues */}
      {createPortal(
        <div
          className={`md:hidden fixed inset-0 ${
            menuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          // Close when clicking backdrop
          onClick={() => setMenuOpen(false)}
        >
          <div
            aria-hidden
            className={`absolute inset-0 z-[1000] pointer-events-auto bg-black/40 transition-opacity duration-200 motion-reduce:transition-none ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className={`absolute right-0 top-0 z-[1001] pointer-events-auto h-full w-[88%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 pt-[env(safe-area-inset-top)]">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-content-center rounded-lg bg-green-600 text-white">
                  <BellRing className="h-4 w-4" />
                </div>
                <span className="font-semibold">HeyRemindly</span>
              </div>
              <button
                aria-label="Tutup menu"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700"
                ref={closeBtnRef}
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex h-[calc(100%-56px)] flex-col gap-1 overflow-y-auto p-4 pb-[env(safe-area-inset-bottom)]">
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
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-green-700"
              >
                <PhoneCall className="h-4 w-4" /> Hubungkan WhatsApp
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
