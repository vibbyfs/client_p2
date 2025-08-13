import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Filter, Search } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const shouldReduceMotion = useReducedMotion();
  const [q, setQ] = useState("");
  return (
    <div className="sticky top-0 z-20 hidden border-b border-orange-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3">
        <div className="relative w-96">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari reminder, teman, atau notifikasi..."
            className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm">
            <div className="grid h-7 w-7 place-content-center rounded-full bg-orange-100 text-orange-700">
              RH
            </div>
            <span>Rina H.</span>
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          </div>
        </div>
      </div>
      {!shouldReduceMotion && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-orange-500 to-orange-300"
        />
      )}
    </div>
  );
}
