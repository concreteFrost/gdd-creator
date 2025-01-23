import "@styles/style.scss";
import GDDView from "@pages/GDDView/GDDView";
import Dashboard from "@pages/Dashboard/Dashboard";
import NotFoundPage from "@pages/NotFound";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ModalManager from "@components/Modal/ModalManager";
import SetLocalisation from "@components/Localisation/SetLocalisation";
import LoginPage from "@pages/Login";
import Register from "@pages/Register";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/register" element={<Register></Register>} />
          <Route
            path="/"
            element={<ProtectedRoute component={<Dashboard></Dashboard>} />}
          />
          <Route
            path="/gdd/*"
            element={<ProtectedRoute component={<GDDView />} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute component={<NotFoundPage />} />}
          />
        </Routes>
      </Router>
      <SetLocalisation></SetLocalisation>
      <ModalManager></ModalManager>
    </div>
  );
}
