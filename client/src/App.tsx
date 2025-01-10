import "@styles/style.scss";
import GDDView from "@pages/GDDView/GDDView";
import NewGDDView from "@pages/NewGDDView/NewGDDView";
import NotFoundPage from "@pages/NotFound";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ModalManager from "@components/Modal/ModalManager";
import SetLocalisation from "@components/Localisation/SetLocalisation";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<NewGDDView />} />
          <Route path="/gdd/*" element={<GDDView />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <SetLocalisation></SetLocalisation>
      <ModalManager></ModalManager>
    
    </div>
  );
}
