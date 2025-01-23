import EditMechanicForm from "@components/Forms/MechanicsForm/EditMechanicsForm";
import NewMechanicForm from "@components/Forms/MechanicsForm/NewMechanicForm";
import MechanicsList from "@components/Tables/Mechanics/MechanicsList";
import { Route, Routes } from "react-router-dom";

export default function MechanicsView() {
  return (
    <Routes>
      <Route path="new" element={<NewMechanicForm></NewMechanicForm>}></Route>
      <Route
        path=":mechanicId"
        element={<EditMechanicForm></EditMechanicForm>}
      ></Route>
      <Route path="/" element={<MechanicsList></MechanicsList>}></Route>
    </Routes>
  );
}
