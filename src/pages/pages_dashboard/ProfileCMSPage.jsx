import { Mail, Phone, Save, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function ProfileCMSPage() {
  function useApiConfig() {
    return {
      getProfilesUrl: "/api/profiles", // GET (array of User);
      updateProfileUrl: (id) => `/api/profiles/${id}`, // PUT
    };
  }
  const api = useApiConfig();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [infoBanner, setInfoBanner] = useState("");

  const [id, setId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", bio: "" });
  const [saving, setSaving] = useState(false);

  const controllerRef = useRef(null);

  const fetchSelf = async () => {
    setLoading(true);
    setError("");
    setInfoBanner("");
    try {
      controllerRef.current?.abort?.();
      controllerRef.current = new AbortController();
      const res = await fetch(api.getProfilesUrl, {
        method: "GET",
        credentials: "include",
        signal: controllerRef.current.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const arr = Array.isArray(json) ? json : [];
      const meId =
        typeof window !== "undefined" && window.__ME_ID__
          ? Number(window.__ME_ID__)
          : null;
      let me = null;
      if (meId != null) {
        me = arr.find((u) => Number(u.id) === meId) || null;
      }
      if (!me) {
        me = arr[0] || null;
        if (arr.length > 1)
          setInfoBanner(
            "Multiple user terdeteksi dari backend. Karena __ME_ID__ belum di-set, profil pertama dipilih sementara."
          );
      }
      if (!me) throw new Error("Data profil tidak ditemukan");
      setId(me.id);
      setForm({
        name: me.name || "",
        email: me.email || "",
        phone: me.phone || "",
        bio: me.bio || "",
      });
    } catch (e) {
      setError(e?.message || "Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelf();
    return () => controllerRef.current?.abort?.();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const canSave = id != null && !saving;

  const saveProfile = async () => {
    if (!canSave) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(api.updateProfileUrl(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
    } catch (e) {
      setError(e?.message || "Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-50 text-neutral-800">
        <div className="lg:pl-64">
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <section className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                    Profil
                  </h1>
                  <p className="text-sm text-neutral-700">
                    Perbarui informasi akun Anda.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm">
                  <div className="grid h-7 w-7 place-content-center rounded-full bg-orange-100 text-orange-700">
                    ME
                  </div>
                  <span>ID: {id ?? "-"}</span>
                </div>
              </div>
              {infoBanner && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  {infoBanner}
                </div>
              )}
            </section>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Edit panel */}
            <section
              id="edit"
              className="mt-4 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-4 shadow-sm"
            >
              <h2 className="text-base font-semibold text-neutral-900">
                Edit Profil
              </h2>

              {loading && (
                <div className="mt-3 grid gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded-xl bg-neutral-100"
                    />
                  ))}
                </div>
              )}

              {!loading && (
                <>
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block text-xs font-medium text-neutral-700"
                      >
                        Nama
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Nama"
                        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
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
                        <Mail    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={onChange}
                          placeholder="Email"
                          className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
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
                          name="phone"
                          value={form.phone}
                          onChange={onChange}
                          placeholder="Nomor WhatsApp"
                          className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="bio"
                        className="mb-1 block text-xs font-medium text-neutral-700"
                      >
                        Bio (opsional)
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={form.bio}
                        onChange={onChange}
                        placeholder="Sedikit tentang kamu"
                        className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-orange-500 focus:ring focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-neutral-500">
                      ID:{" "}
                      <span className="font-medium text-neutral-800">
                        {id ?? "-"}
                      </span>
                    </div>
                    <button
                      disabled={!canSave}
                      onClick={saveProfile}
                      className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white enabled:hover:bg-orange-700 disabled:opacity-60"
                    >
                      <Save className="h-4 w-4" /> Simpan Perubahan
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-orange-600" /> Data
                      sensitif (password) tidak ditampilkan
                    </span>
                  </div>
                </>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
