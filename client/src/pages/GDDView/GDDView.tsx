import Sidebar from "@components/Sidebar/Sidebar";
import * as gddStyle from "./GDDView.module.scss";
import { Route, Routes } from "react-router-dom";
import GeneralInfo from "@views/GeneralInfo";

function GDDView() {
  return (
    <div className={gddStyle.container}>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="info" element={<GeneralInfo></GeneralInfo>} />
        <Route path="mechanics" element={<GeneralInfo></GeneralInfo>} />
        <Route path="gameplay" element={<GeneralInfo></GeneralInfo>} />
        <Route path="locations" element={<GeneralInfo></GeneralInfo>} />
        <Route path="characters" element={<GeneralInfo></GeneralInfo>} />
      </Routes>
    </div>
  );
}

export default GDDView;
