export default function FooterMain() {
  return (
    <>
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
    </>
  );
}
