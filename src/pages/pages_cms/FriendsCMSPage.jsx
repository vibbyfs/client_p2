import { Search, Trash2, UserCheck, UserPlus, UserX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import http from "../../lib/http";

export default function FriendsCMSPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("DESC");

  // data
  const [rows, setRows] = useState([]); // shape from controller mapping

  // invite
  const [username, setUsername] = useState("");
  const [busyInvite, setBusyInvite] = useState(false);

  // busy per row
  const [busyMap, setBusyMap] = useState({});

  const controllerRef = useRef(null);

  async function fetchFriends() {
    try {
      const response = await http.get("/friends", {
        params: { search: q, sort },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRows(response.data);
    } catch (err) {
      console.log("ERROR FRIENDS PAGE FETCH", err);
    }
  }

  // dedupe friends by otherUser.id (hindari dobel username saat relasi 2 arah)
  const friendsAll = useMemo(() => {
    const map = new Map();
    for (const f of rows) {
      if (f.status !== "accepted" || !f.otherUser) continue;
      const key = String(f.otherUser.id);
      if (!map.has(key)) map.set(key, f);
      else {
        // keep the most recent
        const prev = map.get(key);
        map.set(
          key,
          new Date(f.createdAt) > new Date(prev.createdAt) ? f : prev
        );
      }
    }
    return Array.from(map.values());
  }, [rows]);

  const incomingPending = useMemo(
    () =>
      rows.filter((r) => r.direction === "incoming" && r.status === "pending"),
    [rows]
  );
  const outgoingPending = useMemo(
    () =>
      rows.filter((r) => r.direction === "outgoing" && r.status === "pending"),
    [rows]
  );

  // const fmt = (iso) => {
  //   if (!iso) return "-";
  //   try {
  //     return new Intl.DateTimeFormat("id-ID", {
  //       dateStyle: "medium",
  //       timeStyle: "short",
  //     }).format(new Date(iso));
  //   } catch {
  //     return String(iso);
  //   }
  // };

  // actions
  async function handleInvite(e) {
    e?.preventDefault?.();
    const clean = username.trim();
    if (!clean) return;
    setBusyInvite(true);
    try {
      await http.post(
        "/friends/request",
        { username: clean },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setUsername("");
      await fetchFriends();
    } catch (err) {
      console.log(
        "ERROR PAGE FRIENNDS HANDLE INVITE",
        err?.response?.data || err?.message || err
      );
    } finally {
      setBusyInvite(false);
    }
  }

  async function handleRespond(e, id, action) {
    e.preventDefault();
    try {
      await http.put(
        `/friends/${id}/respond`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      await fetchFriends();
    } catch (err) {
      console.log("ERROR PAGE FRIENNDS HANDLE RESPON", err);
    }
  }

  async function handleDelete(id) {
    try {
      await http.delete(`/friends/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.log("ERROR PAGE FRIENDS HANDLE DELETE", err);
    }
  }
  useEffect(() => {
    fetchFriends();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-neutral-50 text-neutral-800">
        <div className="lg:pl-64">
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* grid utama: kiri besar, kanan kecil */}
            <section className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* LEFT: All Friends table (span 2) */}
              <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-neutral-900">
                    All Friends
                  </h2>
                  <button
                    onClick={fetchFriends}
                    className="self-start rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100 sm:self-auto"
                  >
                    Refresh
                  </button>
                </div>

                <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-neutral-50 text-neutral-600">
                      <tr>
                        <th className="px-3 py-2 font-medium">Username</th>
                        <th className="px-3 py-2 font-medium">Status</th>
                        <th className="px-3 py-2 font-medium">Dibuat</th>
                        <th className="px-3 py-2 font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {friendsAll.map((f) => (
                        <tr
                          key={f.otherUser.id}
                          className="hover:bg-neutral-50"
                        >
                          <td className="px-3 py-2 text-neutral-800">
                            {f.otherUser?.username || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                              {f.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-neutral-600">
                            {f.createdAt}
                          </td>
                          <td className="px-3 py-2">
                            <button
                              onClick={() => handleDelete(f.id)}
                              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-2 py-1 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 disabled:opacity-60"
                            >
                              <Trash2 className="h-4 w-4" /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RIGHT: Requests panel */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold text-neutral-900">
                  Requests
                </h2>

                {/* Invite form */}
                <form id="invite" onSubmit={handleInvite} className="mt-3">
                  <label className="mb-1 block text-xs font-medium text-neutral-700">
                    Undang via username
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username teman…"
                      className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-green-600 focus:ring focus:ring-green-600/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-green-800 disabled:opacity-60"
                  >
                    <UserPlus className="h-4 w-4" /> Kirim Undangan
                  </button>
                </form>

                {/* Incoming */}
                <div className="mt-5 rounded-xl border border-neutral-200 p-3">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Incoming Requests
                  </h3>
                  {incomingPending.length === 0 ? (
                    <p className="mt-2 text-xs text-neutral-500">
                      Tidak ada undangan masuk.
                    </p>
                  ) : (
                    <ul className="mt-2 grid gap-2">
                      {incomingPending.map((r) => (
                        <li
                          key={r.id}
                          className="flex items-center justify-between gap-2 rounded-lg bg-neutral-50 p-2"
                        >
                          <span className="text-sm text-neutral-800">
                            {r.otherUser?.username || "-"}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleRespond(e, r.id, "accept")}
                              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                            >
                              <UserCheck className="h-4 w-4" /> Accept
                            </button>
                            <button
                              onClick={(e) => handleRespond(e, r.id, "reject")}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                            >
                              <UserX className="h-4 w-4" /> Reject
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Outgoing */}
                <div className="mt-4 rounded-xl border border-neutral-200 p-3">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Outgoing Requests
                  </h3>
                  {outgoingPending.length === 0 ? (
                    <p className="mt-2 text-xs text-neutral-500">
                      Tidak ada undangan keluar.
                    </p>
                  ) : (
                    <ul className="mt-2 grid gap-2">
                      {outgoingPending.map((r) => (
                        <li
                          key={r.id}
                          className="flex items-center justify-between gap-2 rounded-lg bg-neutral-50 p-2"
                        >
                          <span className="text-sm text-neutral-800">
                            {r.otherUser?.username || "-"}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(r.id)}
                              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-2 py-1 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 disabled:opacity-60"
                            >
                              <Trash2 className="h-4 w-4" /> Cancel
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
