import "@styles/style";
import GDDView from "@pages/GDDView/GDDView";
import NewGDDView from "@pages/NewGDDView/NewGDDView";
import NotFoundPage from "@pages/NotFound";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

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
    </div>
  );
}
