import { ActiveModal } from "@store/slices/modalSlice";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import InfoModal from "./InfoModal";
import RedirectModal from "./RedirectModal";
import withModalWindow from "@components/_hoc/withModalWindow";
import ConfirmationModal from "./ConfirmationModal";

function ModalManager() {
  const { activeModal } = useSelector((state: RootState) => state.modalSlice);

  if (activeModal === ActiveModal.None) return;

  switch (activeModal) {
    case ActiveModal.Info:
      return <InfoModal></InfoModal>;
    case ActiveModal.Redirect:
      return <RedirectModal></RedirectModal>;
    // case ActiveModal.Confirmation:
    //   return <ConfirmationModal></ConfirmationModal>;
  }
}

export default withModalWindow(ModalManager);
