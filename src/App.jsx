import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/pages_publics/LandingPage";
import RegisterPage from "./pages/pages_dashboard/RegisterPage";
import LoginPage from "./pages/pages_dashboard/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
