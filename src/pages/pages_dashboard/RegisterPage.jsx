import { ArrowRight, BellRing } from "lucide-react";
import AnimationRegister from "../../components/dashboards/AnimationRegister";
import RegisterForm from "../../components/dashboards/RegisterForm";

export default function RegisterPage() {
  function SkipLink() {
    return (
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-orange-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white text-neutral-800">
        <SkipLink />
        <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-content-center rounded-xl bg-orange-600 text-white shadow-sm">
                <BellRing className="h-5 w-5" />
              </div>
              <span className="font-semibold tracking-tight">TemanIngat</span>
            </a>
            <a
              href="#login"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              Sudah punya akun? Masuk <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </header>

        <main
          id="home"
          className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8"
        >
          {/* Left: Animated panel */}
          <AnimationRegister />

          {/* Right: Register form */}
          <RegisterForm />
        </main>

        <footer className="border-t border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} Remindly
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <a href="#" className="hover:text-orange-700">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-orange-700">
                Syarat Layanan
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
