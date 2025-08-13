import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PhoneCall,
  User,
} from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const shouldReduceMotion = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const es = {};
    if (!form.name.trim()) es.name = "Nama wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      es.email = "Email tidak valid";
    if (!/^\+?\d{9,15}$/.test(form.phone.replace(/\s|-/g, "")))
      es.phone = "Nomor WhatsApp tidak valid";
    if (form.password.length < 6) es.password = "Minimal 6 karakter";
    if (form.password !== form.confirm) es.confirm = "Konfirmasi tidak cocok";
    if (!form.agree) es.agree = "Harap setujui syarat & kebijakan";
    setErrors(es);
    return Object.keys(es).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section className="order-1 lg:order-2">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8 lg:ml-auto">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-content-center rounded-xl bg-orange-600 text-white">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              Welcome Back!
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Mulai gratis. Bisa diubah ke Pro kapan saja.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-neutral-800"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={onChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring ${
                  errors.email
                    ? "border-red-400 ring-red-200"
                    : "border-neutral-200 ring-orange-500/20 focus:border-orange-500"
                }`}
                placeholder="kamu@contoh.com"
              />
              <Mail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-neutral-800"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={form.password}
                onChange={onChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring ${
                  errors.password
                    ? "border-red-400 ring-red-200"
                    : "border-neutral-200 ring-orange-500/20 focus:border-orange-500"
                }`}
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-500 hover:bg-neutral-100"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label
              htmlFor="confirm"
              className="mb-1 block text-sm font-medium text-neutral-800"
            >
              Ulangi Kata Sandi
            </label>
            <div className="relative">
              <input
                id="confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                required
                value={form.confirm}
                onChange={onChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring ${
                  errors.confirm
                    ? "border-red-400 ring-red-200"
                    : "border-neutral-200 ring-orange-500/20 focus:border-orange-500"
                }`}
                placeholder="Ulangi kata sandi"
              />
              <button
                type="button"
                aria-label={
                  showConfirm
                    ? "Sembunyikan konfirmasi"
                    : "Tampilkan konfirmasi"
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-500 hover:bg-neutral-100"
                onClick={() => setShowConfirm((s) => !s)}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
            {errors.confirm && (
              <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700"
          >
            {submitted ? (
              <Check className="h-5 w-5" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}{" "}
            {submitted ? "Berhasil!" : "Buat Akun"}
          </button>

          {submitted && (
            <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
              Akun kamu siap! Kami akan mengarahkanmu untuk menghubungkan
              WhatsApp.
            </div>
          )}

          <p className="pt-2 text-center text-sm text-neutral-600">
            Belum punya akun?{" "}
            <a
              href="#login"
              className="font-medium text-orange-700 hover:text-orange-800"
            >
              Daftar
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
