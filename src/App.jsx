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

function DashboardLayout() {
  return (
    <>
      <div className="min-h-screen bg-neutral-50 text-neutral-800">
        <Sidebar />
        <div className="lg:pl-10 pr-10">
          <Topbar />
          <Outlet />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
