import "@styles/style.scss";
import GDDView from "@pages/GDDView/GDDView";
import Dashboard from "@pages/Dashboard/Dashboard";
import NotFoundPage from "@pages/NotFound";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ModalManager from "@components/Modal/ModalManager";
import SetLocalisation from "@components/Localisation/SetLocalisation";
import LoginPage from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import Spinner from "@components/Loader/Spinner";
import PasswordReset from "@pages/PasswordReset/PasswordReset";

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
          <Route path="*" element={<NotFoundPage />} />
          <Route path="reset-password" element={<PasswordReset />}></Route>
        </Routes>
      </Router>
      <SetLocalisation></SetLocalisation>
      <ModalManager></ModalManager>
      <Spinner></Spinner>
    </div>
  );
}
