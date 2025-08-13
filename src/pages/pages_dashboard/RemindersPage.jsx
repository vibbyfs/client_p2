import { BellRing, Plus, Search, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function RemindersCMSPage() {
  const api = useApiConfig();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({ count: 0, reminders: [] });

  const [keyword, setKeyword] = useState("");
  const [busyCancel, setBusyCancel] = useState(false);

  const controllerRef = useRef(null);

  function useApiConfig() {
    // Ganti sesuai routing backend kamu jika berbeda
    return {
      getActiveUrl: "/api/reminders/active", // GET
      cancelByKeywordUrl: "/api/reminders/cancel/keyword", // POST { keyword }
      cancelRecurringUrl: "/api/reminders/cancel/recurring", // POST
      cancelAllUrl: "/api/reminders/cancel/all", // POST
    };
  }

  const fetchActive = async () => {
    setLoading(true);
    setError("");
    try {
      controllerRef.current?.abort?.();
      controllerRef.current = new AbortController();
      const res = await fetch(api.getActiveUrl, {
        method: "GET",
        signal: controllerRef.current.signal,
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Defensive: normalisasi struktur
      setData({
        count: json.count ?? (json.reminders?.length || 0),
        reminders: Array.isArray(json.reminders) ? json.reminders : [],
      });
    } catch (e) {
      setError(e?.message || "Gagal memuat reminder aktif");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActive();
    return () => controllerRef.current?.abort?.();
  }, []);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return data.reminders;
    return data.reminders.filter((r) =>
      (r.title || "").toLowerCase().includes(q)
    );
  }, [data.reminders, keyword]);

  const fmt = (iso) => {
    if (!iso) return "-";
    try {
      const date = new Date(iso);
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch {
      return String(iso);
    }
  };

  // ---- Cancel handlers ----
  const cancelByKeyword = async (kw) => {
    if (!kw) return;
    setBusyCancel(true);
    setError("");
    try {
      const res = await fetch(api.cancelByKeywordUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ keyword: kw }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      // Optimistic refresh
      await fetchActive();
    } catch (e) {
      setError(e?.message || "Gagal membatalkan reminder (keyword)");
    } finally {
      setBusyCancel(false);
    }
  };

  const cancelRecurring = async () => {
    setBusyCancel(true);
    setError("");
    try {
      const res = await fetch(api.cancelRecurringUrl, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      await fetchActive();
    } catch (e) {
      setError(e?.message || "Gagal membatalkan reminder berulang");
    } finally {
      setBusyCancel(false);
    }
  };

  const cancelAll = async () => {
    setBusyCancel(true);
    setError("");
    try {
      const res = await fetch(api.cancelAllUrl, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      await fetchActive();
    } catch (e) {
      setError(e?.message || "Gagal membatalkan semua reminder");
    } finally {
      setBusyCancel(false);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* <Header /> */}
          <section className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                  Reminder
                </h1>
                <p className="text-sm text-neutral-700">
                  Kelola pengingat aktif, batalkan berdasarkan kebutuhan, dan
                  refresh data dari backend.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#add"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4" /> Tambah Reminder
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  Kembali ke Dashboard
                </a>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-orange-600" /> Privasi
                terjaga
              </span>
              <span className="inline-flex items-center gap-1">
                <BellRing className="h-4 w-4 text-orange-600" /> Status: aktif
                terjadwal
              </span>
            </div>
          </section>

          {/* Actions strip */}
          <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <label
                htmlFor="kw"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Batalkan berdasarkan kata kunci
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  id="kw"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="misal: presentasi"
                  className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
                />
              </div>
              <button
                disabled={!keyword || busyCancel}
                onClick={() => cancelByKeyword(keyword)}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-orange-700 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" /> Batalkan yang cocok
              </button>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-neutral-800">
                Batalkan semua berulang
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Stop semua reminder dengan repeat ≠ "none".
              </p>
              <button
                disabled={busyCancel}
                onClick={cancelRecurring}
                className="mt-2 inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" /> Batalkan berulang
              </button>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-neutral-800">
                Batalkan semua aktif
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                Termasuk yang non‑recurring (status: scheduled).
              </p>
              <button
                disabled={busyCancel}
                onClick={cancelAll}
                className="mt-2 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" /> Batalkan semua
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-neutral-900">
                Reminder Aktif
              </h2>
              <button
                onClick={fetchActive}
                className="text-sm font-medium text-orange-700 hover:text-orange-800"
              >
                Refresh
              </button>
            </div>

            {loading && (
              <div className="mt-6 grid gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-12 animate-pulse rounded-xl bg-neutral-100"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && data.count === 0 && (
              <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
                Belum ada reminder aktif. Coba buat baru atau hapus filter kata
                kunci.
              </div>
            )}

            {!loading && !error && data.count > 0 && (
              <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-neutral-600">
                    <tr>
                      <th className="px-3 py-2 font-medium">Judul</th>
                      <th className="px-3 py-2 font-medium">Jatuh Tempo</th>
                      <th className="px-3 py-2 font-medium">Repeat</th>
                      <th className="px-3 py-2 font-medium">Penerima</th>
                      <th className="px-3 py-2 font-medium">Dibuat</th>
                      <th className="px-3 py-2 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filtered.map((r) => (
                      <tr key={r.id} className="hover:bg-neutral-50">
                        <td className="px-3 py-2 text-neutral-800">
                          {r.title}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {fmt(r.dueAt)}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {r.repeat || "none"}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {r.recipientId || "-"}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {fmt(r.createdAt)}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(JSON.stringify(r, null, 2))}
                              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-50"
                            >
                              Detail
                            </button>
                            <button
                              disabled={busyCancel}
                              onClick={() => cancelByKeyword(r.title)}
                              className="rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100 disabled:opacity-60"
                            >
                              Batalkan
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
