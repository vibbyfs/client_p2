import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import http from "../../lib/http";

export default function RemindersCMSPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("DESC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [busyMap, setBusyMap] = useState({});
  const controllerRef = useRef(null);

  const meId =
    typeof window !== "undefined" && window.__ME_ID__ != null
      ? Number(window.__ME_ID__)
      : null;

  function fmt(iso) {
    if (!iso) return "-";
    try {
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return String(iso);
    }
  }

  async function fetchReminders(e) {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    try {
      controllerRef.current?.abort?.();
      controllerRef.current = new AbortController();

      const response = await http.get("/reminders/actives", {
        params: { search, filter, sort },
        signal: controllerRef.current.signal,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const serverRows = Array.isArray(response.data) ? response.data : [];

      // FE guard tambahan: filter ke user saat ini bila __ME_ID__ tersedia.
      const scopedRows =
        meId != null
          ? serverRows.filter((r) => Number(r.UserId) === meId)
          : serverRows;

      setRows(scopedRows);
    } catch (err) {
      setError(err?.message || "Gagal memuat reminders");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelReminder(id) {
    setBusyMap((m) => ({ ...m, [id]: true }));
    try {
      await http.put(
        `/reminders/cancel/${id}`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      await fetchReminders();
    } catch (err) {
      setError(err?.message || "Gagal membatalkan reminder");
    } finally {
      setBusyMap((m) => ({ ...m, [id]: false }));
    }
  }

  async function handleDeleteReminder(id) {
    setBusyMap((m) => ({ ...m, [id]: true }));
    try {
      await http.delete(`/reminders/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err?.message || "Gagal menghapus reminder");
    } finally {
      setBusyMap((m) => ({ ...m, [id]: false }));
    }
  }

  useEffect(() => {
    fetchReminders();
    return () => controllerRef.current?.abort?.();
  }, []);

  const localFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => (r.title || "").toLowerCase().includes(q));
  }, [rows, search]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Controls */}
          <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
              <label
                htmlFor="q"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Cari judul
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  id="q"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="misal: presentasi"
                  className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-green-600 focus:ring focus:ring-green-600/20"
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={fetchReminders}
                  className="rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Terapkan ke server
                </button>
                <button
                  onClick={() => {
                    setSearch("");
                    fetchReminders();
                  }}
                  className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-neutral-800">Filter status</p>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring focus:ring-green-600/20"
              >
                <option value="">Semua</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={fetchReminders}
                className="mt-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Terapkan
              </button>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-neutral-800">Urutkan</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSort("ASC");
                    fetchReminders();
                  }}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    sort === "ASC"
                      ? "bg-green-700 text-white"
                      : "border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  Terlama
                </button>
                <button
                  onClick={() => {
                    setSort("DESC");
                    fetchReminders();
                  }}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    sort === "DESC"
                      ? "bg-green-700 text-white"
                      : "border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  Terbaru
                </button>
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-semibold text-neutral-900">
                Reminder Aktif
              </h2>
              <button
                onClick={fetchReminders}
                className="self-start rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100 sm:self-auto"
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

            {!loading && !error && localFiltered.length === 0 && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                Tidak ada data. Ubah pencarian/filter atau buat reminder baru.
              </div>
            )}

            {!loading && !error && localFiltered.length > 0 && (
              <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-neutral-600">
                    <tr>
                      <th className="px-3 py-2 font-medium">Judul</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Jatuh Tempo</th>
                      <th className="px-3 py-2 font-medium">Repeat</th>
                      <th className="px-3 py-2 font-medium">Penerima</th>
                      <th className="px-3 py-2 font-medium">Dibuat</th>
                      <th className="px-3 py-2 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {localFiltered.map((r) => (
                      <tr key={r.id} className="hover:bg-neutral-50">
                        <td className="px-3 py-2 text-neutral-800">
                          {r.title}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              r.status === "sent"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : r.status === "cancelled"
                                ? "bg-neutral-50 text-neutral-700 border border-neutral-200"
                                : "bg-green-50 text-green-700 border border-green-200"
                            }`}
                          >
                            {r.status || "scheduled"}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {fmt(r.dueAt)}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {r.repeat || "none"}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {r.RecipientId ?? r.recipientId ?? "-"}
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
                              disabled={
                                !!busyMap[r.id] || r.status === "cancelled"
                              }
                              onClick={() => handleCancelReminder(r.id)}
                              className="rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100 disabled:opacity-60"
                            >
                              Cancel
                            </button>
                            <button
                              disabled={!!busyMap[r.id]}
                              onClick={() => handleDeleteReminder(r.id)}
                              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-50"
                            >
                              Delete
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
