import { Phone, UserCheck, UserPlus, Users } from "lucide-react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function FriendsCMSPage() {
  const api = useApiConfig();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([]);

  // Invite state
  const [phone, setPhone] = useState("");
  const [friendId, setFriendId] = useState("");
  const [busyInvite, setBusyInvite] = useState(false);

  // Accept/Reject busy state per id
  const [busyMap, setBusyMap] = useState({});

  // Local search
  const [query, setQuery] = useState("");

  // Me id (opsional): coba baca dari window.__ME_ID__
  const meId =
    typeof window !== "undefined" && window.__ME_ID__
      ? Number(window.__ME_ID__)
      : null;

  function useApiConfig() {
    return {
      getFriendsUrl: "/api/friends", // GET
      createFriendUrl: "/api/friends", // POST { phone? , friendId? }
      updateFriendUrl: (id) => `/api/friends/${id}`, // PUT { action: 'accept'|'reject' }
    };
  }

  const controllerRef = useRef(null);

  const fetchFriends = async () => {
    setLoading(true);
    setError("");
    try {
      controllerRef.current?.abort?.();
      controllerRef.current = new AbortController();
      const res = await fetch(api.getFriendsUrl, {
        method: "GET",
        signal: controllerRef.current.signal,
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setFriends(Array.isArray(json) ? json : []);
    } catch (e) {
      setError(e?.message || "Gagal memuat daftar teman");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
    return () => controllerRef.current?.abort?.();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter(
      (f) =>
        String(f.id).includes(q) ||
        String(f.UserId || "").includes(q) ||
        String(f.FriendId || "").includes(q) ||
        String(f.phone || "")
          .toLowerCase()
          .includes(q) ||
        String(f.status || "")
          .toLowerCase()
          .includes(q)
    );
  }, [friends, query]);

  const roleFor = (f) => {
    if (meId == null) return "unknown";
    if (f.FriendId === meId) return "incoming";
    if (f.UserId === meId) return "outgoing";
    return "other";
  };

  const canActOn = (f) => f.status === "pending" && roleFor(f) === "incoming"; // hanya penerima yang boleh accept/reject

  // ---- Invite handlers ----
  const inviteFriend = async () => {
    if (!phone && !friendId) return;
    setBusyInvite(true);
    setError("");
    try {
      const body = phone ? { phone } : { friendId: Number(friendId) };
      const res = await fetch(api.createFriendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      setPhone("");
      setFriendId("");
      await fetchFriends();
    } catch (e) {
      setError(e?.message || "Gagal mengirim undangan teman");
    } finally {
      setBusyInvite(false);
    }
  };

  // ---- Accept/Reject ----
  const actOnInvite = async (id, action) => {
    setBusyMap((m) => ({ ...m, [id]: true }));
    setError("");
    try {
      const res = await fetch(api.updateFriendUrl(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      await fetchFriends();
    } catch (e) {
      setError(e?.message || `Gagal memproses undangan (${action})`);
    } finally {
      setBusyMap((m) => ({ ...m, [id]: false }));
    }
  };
  return (
    <>
      <div className="min-h-screen bg-neutral-50 text-neutral-800">
        <div className="lg:pl-64">
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* <Header onQuery={setQuery} /> */}

            {/* Invite card */}
            <section
              id="invite"
              className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-neutral-800">
                  Undang berdasarkan nomor WA
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Contoh format: +62812xxxxxxx
                </p>
                <div className="relative mt-2">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Masukkan nomor WhatsApp (opsional)"
                    className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
                  />
                </div>
                <button
                  disabled={busyInvite || (!phone && !friendId)}
                  onClick={inviteFriend}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-orange-700 disabled:opacity-60"
                >
                  <UserPlus className="h-4 w-4" /> Kirim Undangan
                </button>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-neutral-800">
                  Atau berdasarkan ID user
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Jika kamu tahu userId‑nya.
                </p>
                <div className="relative mt-2">
                  <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                    placeholder="Masukkan friendId (opsional)"
                    className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
                  />
                </div>
                <button
                  disabled={busyInvite || (!phone && !friendId)}
                  onClick={inviteFriend}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-orange-700 disabled:opacity-60"
                >
                  <UserPlus className="h-4 w-4" /> Kirim Undangan
                </button>
              </div>
            </section>

            {/* Errors */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Table */}
            <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900">
                  Daftar Teman
                </h2>
                <button
                  onClick={fetchFriends}
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

              {!loading && !friends.length && !error && (
                <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
                  Belum ada relasi teman. Kirim undangan untuk mulai terhubung.
                </div>
              )}

              {!loading && !!friends.length && (
                <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-neutral-50 text-neutral-600">
                      <tr>
                        <th className="px-3 py-2 font-medium">ID</th>
                        <th className="px-3 py-2 font-medium">UserId</th>
                        <th className="px-3 py-2 font-medium">FriendId</th>
                        <th className="px-3 py-2 font-medium">Status</th>
                        <th className="px-3 py-2 font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {filtered.map((f) => (
                        <tr key={f.id} className="hover:bg-neutral-50">
                          <td className="px-3 py-2 text-neutral-800">{f.id}</td>
                          <td className="px-3 py-2 text-neutral-600">
                            {f.UserId}
                          </td>
                          <td className="px-3 py-2 text-neutral-600">
                            {f.FriendId}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${
                                f.status === "accepted"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : f.status === "pending"
                                  ? "bg-orange-50 text-orange-700 border border-orange-200"
                                  : "bg-neutral-50 text-neutral-700 border border-neutral-200"
                              }`}
                            >
                              {f.status}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {canActOn(f) ? (
                              <div className="flex items-center gap-2">
                                <button
                                  disabled={!!busyMap[f.id]}
                                  onClick={() => actOnInvite(f.id, "accept")}
                                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                                >
                                  <UserCheck className="h-4 w-4" /> Accept
                                </button>
                                <button
                                  disabled={!!busyMap[f.id]}
                                  onClick={() => actOnInvite(f.id, "reject")}
                                  className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                                >
                                  <UserX className="h-4 w-4" /> Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-neutral-500">
                                -
                              </span>
                            )}
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
    </>
  );
}
