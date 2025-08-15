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
import { Link, useNavigate } from "react-router";
import http from "../../lib/http";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "rina",
    phone: "+6281322915622",
    email: "rina@mail.com",
    password: "password",
  });

  async function handleSubmitRegister(e) {
    e.preventDefault();
    try {
      await http.post("/auth/register", formData);

      navigate("/");
    } catch (err) {
      console.log("ERROR SUBMIT REGISTER", err);
    }
  }

  return (
    <section className="order-1 lg:order-2">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8 lg:ml-auto">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-content-center rounded-xl bg-orange-600 text-white">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              Buat Akun
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Mulai gratis. Bisa diubah ke Pro kapan saja.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmitRegister}
          noValidate
          className="mt-6 space-y-4"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800">
              Username
            </label>
            <div className="relative">
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="contoh: Rina Hartati"
              />
              <User className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
          </div>

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
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="kamu@contoh.com"
              />
              <Mail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-neutral-800"
            >
              Nomor WhatsApp
            </label>
            <div className="relative">
              <input
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="contoh: +6281234567890"
              />
              <PhoneCall className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
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
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-500 hover:bg-neutral-100"
              ></button>
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700"
          >
            Submit
          </button>

          <p className="pt-2 text-center text-sm text-neutral-600">
            Sudah punya akun?{" "}
            <Link
              href="#login"
              className="font-medium text-orange-700 hover:text-orange-800"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
