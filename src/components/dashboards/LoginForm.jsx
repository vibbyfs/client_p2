import { useState } from "react";
import { Link, useNavigate } from "react-router";
import http from "../../lib/http";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await http.post("/auth/login", formData);
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/dashboards");
    } catch (err) {
      console.log("ERROR SUBMIT LOGIN", err);
      setErrorMsg(
        err?.response?.data?.message ||
          "Gagal masuk. Periksa email/kata sandi dan coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-scree flex items-center justify-center px-4">
      {/* Container putih */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl h-[600px] p-8 md:p-12">
        {/* Row utama */}
        <div className="flex h-full items-center justify-center">
          {/* Kolom Animasi */}
          {/* <div className="flex items-center justify-center w-[380px]">
            <Lottie
              animationData={loadingLoginPage}
              loop
              className="w-[320px] h-[320px]"
            />
          </div> */}

          {/* Divider tengah */}
          <div className="mx-28 h-full w-px bg-gray-300" />

          {/* Kolom Form */}
          <div className="shrink-0 w-[380px]">
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
              Welcome back! Let's spice things up.
            </h2>

            {/* Error message (optional) */}
            {errorMsg && (
              <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="relative border border-gray-300 px-3 pt-4 pb-2 rounded">
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))
                  }
                  placeholder="e.g. example@mail.com"
                  className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-sm text-gray-700"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative border border-gray-300 px-3 pt-4 pb-2 rounded">
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 -top-2 left-2 bg-white px-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }))
                  }
                  placeholder="********"
                  className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 text-sm text-gray-700"
                  autoComplete="current-password"
                  required
                />
              </div>
                  <button type="submit">Login</button>
            </form>

            <Link to="/" className="block mt-4">
              <button text="Home" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
