import LoginForm from "../../components/dashboards/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main
        id="home"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-svh flex items-center justify-center"
      >
        <LoginForm />
      </main>
    </>
  );
}
