import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/pages_publics/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
