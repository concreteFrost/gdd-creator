import EditLocationForm from "@components/Forms/LocationForm/EditLocationForm";
import NewLocationForm from "@components/Forms/LocationForm/NewLocationForm";
import LocationsTable from "@components/Tables/Locations/LocationsTable";
import { Route, Routes } from "react-router-dom";

export default function LocationsView() {
  return (
    <Routes>
      <Route path="new" element={<NewLocationForm></NewLocationForm>}></Route>
      <Route
        path=":locationId"
        element={<EditLocationForm></EditLocationForm>}
      ></Route>
      <Route path="/" element={<LocationsTable></LocationsTable>}></Route>
    </Routes>
  );
}
