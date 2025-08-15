import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import http from "../../lib/http";

export default function RemindersCMSPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("DESC");
  const [rows, setRows] = useState([]);

  async function fetchReminders() {
    try {
      const response = await http.get("/reminders/actives", {
        params: { search, filter, sort },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setRows(response.data);
    } catch (err) {
      console.log("ERROR FETCHING REMINDERS", err);
    }
  }

  async function handleCancelReminder(id) {
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
      console.log("ERROR REMINDER CANCEL", err);
    }
  }

  async function handleDeleteReminder(id) {
    try {
      await http.delete(`/reminders/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.log("ERROR FETCHING REMINDERS DELETE", err);
    }
  }

  useEffect(() => {
    fetchReminders();
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
              <p className="text-sm font-medium text-neutral-800">
                Filter status
              </p>
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
                      <td className="px-3 py-2 text-neutral-800">{r.title}</td>
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
                      <td className="px-3 py-2 text-neutral-600">{r.dueAt}</td>
                      <td className="px-3 py-2 text-neutral-600">
                        {r.repeat || "none"}
                      </td>
                      <td className="px-3 py-2 text-neutral-600">
                        {r.RecipientId ?? r.recipientId ?? "-"}
                      </td>
                      <td className="px-3 py-2 text-neutral-600">
                        {r.createdAt}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCancelReminder(r.id)}
                            className="rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100 disabled:opacity-60"
                          >
                            Cancel
                          </button>
                          <button
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
          </section>
        </main>
      </div>
    </div>
  );
}
