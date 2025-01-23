import { ActiveModal } from "@store/slices/modalSlice";
import { RootState } from "@store/store";
import React from "react";
import { useSelector } from "react-redux";
import InfoModal from "./InfoModal";
import RedirectModal from "./RedirectModal";
import withModalWindow from "@components/_hoc/withModalWindow";
import MechanicsTypeModal from "./MechanicsTypeModal";

function ModalManager() {
  const { activeModal } = useSelector((state: RootState) => state.modalSlice);

  if (activeModal === ActiveModal.None) return;

  switch (activeModal) {
    case ActiveModal.Info:
      return <InfoModal></InfoModal>;
    case ActiveModal.Redirect:
      return <RedirectModal></RedirectModal>;
  }
}

export default withModalWindow(ModalManager);
