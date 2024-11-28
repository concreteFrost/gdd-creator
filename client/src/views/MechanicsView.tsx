import NewMechanicForm from "@components/Forms/MechanicsForm/NewMechanicForm";
import MechanicsList from "@components/Tables/MechanicsList";
import { Route, Routes } from "react-router-dom";

export default function MechanicsView() {
  return (
    <div style={{ padding: 20 }}>
      <Routes>
        <Route path="new" element={<NewMechanicForm></NewMechanicForm>}></Route>
        <Route path="/" element={<MechanicsList></MechanicsList>}></Route>
      </Routes>
    </div>
  );
}
