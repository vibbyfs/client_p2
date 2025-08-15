import { Mail, Phone, Save, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import http from "../../lib/http";

export default function ProfileCMSPage() {
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [editing, setEditing] = useState(false);
  const controllerRef = useRef(null);

  function hydrateForm(u) {
    setForm({
      name: u?.name ?? u?.username ?? "",
      email: u?.email ?? "",
      phone: u?.phone ?? "",
      bio: u?.bio ?? "",
    });
  }

  // Fetch langsung saat mount (tanpa tombol refresh)
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      setInfo("");
      try {
        controllerRef.current?.abort?.();
        controllerRef.current = new AbortController();
        const res = await http.get("/users/profile", {
          signal: controllerRef.current.signal,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const profile = res.data || null;
        if (!profile) {
          setError("Profile not found.");
          setMe(null);
          return;
        }
        setMe(profile);
        hydrateForm(profile);
      } catch (e) {
        setError(
          e?.response?.data?.message || e?.message || "Gagal memuat profil."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    return () => controllerRef.current?.abort?.();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!me?.id) return;
    setSaving(true);
    setError("");
    setInfo("");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
      };
      const res = await http.put(`/users/${me.id}/update-profile`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const updated = res.data || {};
      setMe(updated);
      hydrateForm(updated);
      setEditing(false);
      setInfo("Profil berhasil diperbarui.");
    } catch (e) {
      setError(
        e?.response?.data?.message || e?.message || "Gagal menyimpan profil."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                  Profil
                </h1>
                <p className="text-sm text-neutral-700">
                  Lihat dan perbarui informasi akun Anda.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm">
                <div className="grid h-7 w-7 place-content-center rounded-full bg-green-100 text-green-700">
                  {String(me?.name || me?.username || "ME")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <span>ID: {me?.id ?? "-"}</span>
              </div>
            </div>
            {info && (
              <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-xs text-green-900">
                {info}
              </div>
            )}
            {error && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}
          </section>

          {/* Content */}
          <section className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            {loading ? (
              <div className="grid gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 animate-pulse rounded-xl bg-neutral-100"
                  />
                ))}
              </div>
            ) : !me ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                Profil tidak tersedia.
              </div>
            ) : (
              <>
                {/* VIEW MODE */}
                {!editing && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-200 p-4">
                      <p className="text-xs font-medium text-neutral-500">
                        Nama
                      </p>
                      <p className="mt-1 text-neutral-900">
                        {me?.name ?? me?.username ?? "-"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 p-4">
                      <p className="text-xs font-medium text-neutral-500">
                        Email
                      </p>
                      <p className="mt-1 text-neutral-900">
                        {me?.email ?? "-"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 p-4">
                      <p className="text-xs font-medium text-neutral-500">
                        Nomor WA
                      </p>
                      <p className="mt-1 text-neutral-900">
                        {me?.phone ?? "-"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 p-4 md:col-span-2">
                      <p className="text-xs font-medium text-neutral-500">
                        Bio
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-neutral-900">
                        {me?.bio || "-"}
                      </p>
                    </div>

                    <div className="md:col-span-2 mt-1 flex items-center justify-between">
                      <div className="text-xs text-neutral-500">
                        ID:{" "}
                        <span className="font-medium text-neutral-800">
                          {me?.id}
                        </span>
                      </div>
                      <button
                        onClick={() => setEditing(true)}
                        className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                      >
                        Edit Profil
                      </button>
                    </div>
                  </div>
                )}

                {/* EDIT MODE */}
                {editing && (
                  <form
                    onSubmit={handleSave}
                    className="grid grid-cols-1 gap-3 md:grid-cols-2"
                  >
                    <div className="md:col-span-2">
                      <label
                        htmlFor="name"
                        className="mb-1 block text-xs font-medium text-neutral-700"
                      >
                        Nama
                      </label>
                      <input
                        id="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Nama"
                        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-green-600 focus:ring focus:ring-green-600/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-xs font-medium text-neutral-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          placeholder="Email"
                          className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-green-600 focus:ring focus:ring-green-600/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block text-xs font-medium text-neutral-700"
                      >
                        Nomor WA
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          id="phone"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          placeholder="Nomor WhatsApp"
                          className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-green-600 focus:ring focus:ring-green-600/20"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="bio"
                        className="mb-1 block text-xs font-medium text-neutral-700"
                      >
                        Bio (opsional)
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        value={form.bio}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, bio: e.target.value }))
                        }
                        placeholder="Sedikit tentang kamu"
                        className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-green-600 focus:ring focus:ring-green-600/20"
                      />
                    </div>

                    <div className="md:col-span-2 mt-1 flex items-center justify-between">
                      <div className="text-xs text-neutral-500">
                        ID:{" "}
                        <span className="font-medium text-neutral-800">
                          {me?.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            hydrateForm(me);
                            setEditing(false);
                          }}
                          className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-green-800 disabled:opacity-60"
                        >
                          <Save className="h-4 w-4" />
                          {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4 text-green-700" /> Data
                        sensitif (password) tidak ditampilkan
                      </span>
                    </div>
                  </form>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
