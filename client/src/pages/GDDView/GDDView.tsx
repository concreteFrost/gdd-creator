import Sidebar from "@components/Sidebar/Sidebar";
import * as gddStyle from "./GDDView.module.scss";
import { Route, Routes } from "react-router-dom";
import GeneralInfo from "@views/GeneralInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { ActiveModal, ModalState, showModal } from "@store/slices/modalSlice";
import MechanicsView from "@views/MechanicsView";

function GDDView() {
  const { id } = useSelector((state: RootState) => state.gddSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === "") {
      const payload: ModalState = {
        text: "GDD was not found",
        activeModal: ActiveModal.Redirect,
      };
      dispatch(showModal(payload));
      return;
    }
  }, []);
  return (
    <div className={gddStyle.container}>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="info" element={<GeneralInfo></GeneralInfo>} />
        <Route path="mechanics/*" element={<MechanicsView />} />
        <Route path="gameplay" element={<GeneralInfo></GeneralInfo>} />
        <Route path="locations" element={<GeneralInfo></GeneralInfo>} />
        <Route path="characters" element={<GeneralInfo></GeneralInfo>} />
      </Routes>
    </div>
  );
}

export default GDDView;
