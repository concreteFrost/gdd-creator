import { useDispatch } from "react-redux";
import { ActiveModal } from "@store/slices/modalSlice";
import { showModal } from "@store/slices/modalSlice";

const useShowModal = (text: string) => {
  return showModal({
    activeModal: ActiveModal.Info,
    text: text,
  });
};

export default useShowModal;
