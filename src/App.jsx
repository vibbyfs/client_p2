import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/pages_publics/LandingPage";
import RegisterPage from "./pages/pages_dashboard/RegisterPage";
import LoginPage from "./pages/pages_dashboard/LoginPage";
import DashboardCMSPage from "./pages/pages_dashboard/DashboardPage";
import RemindersCMSPage from "./pages/pages_dashboard/RemindersPage";
import Sidebar from "./components/dashboards/Sidebar";
import Topbar from "./components/dashboards/Topbar";
import { Outlet } from "react-router";
import FriendsCMSPage from "./pages/pages_dashboard/FriendsCMSPage";
import ProfileCMSPage from "./pages/pages_dashboard/ProfileCMSPage";
import Footer from "./components/publics/Footer";

function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Topbar />
      <Outlet />
      <div className="bg-neutral-50 text-neutral-800">
        <div className="lg:pl-64">
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboards" element={<DashboardCMSPage />} />
            <Route
              path="/dashboards/reminders"
              element={<RemindersCMSPage />}
            />
            <Route path="/dashboards/friends" element={<FriendsCMSPage />} />
            <Route path="/dashboards/profiles" element={<ProfileCMSPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
