import * as button_styles from "@components/Buttons/Button.module.scss";
import * as form_styles from "./Modal.module.scss";
import { MechanicType } from "@_types/gddTypes";
import Modal from "react-modal";
import { icons } from "@assets/icons";
import { showModal, ActiveModal } from "@store/slices/modalSlice";
import {
  addMechanicType,
  deleteMechanicType,
} from "@store/slices/mechanicsTypeSlice";
import {
  createMechnanicsTypeAPI,
  deleteMechnanicsTypeAPI,
  updateMechnanicsTypeAPI,
} from "@services/mechanicsTypesAPI";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import useClearOnTime from "@hooks/useClearOnTime";
import { RootState } from "@store/store";

interface MechanicsTypeProps {
  isVisibe: boolean;
  setVisible: (isVisible: boolean) => void;
  setMechanicsType: (type: string) => void;
  currentType: string | null;
}

function MechanicsTypeModal({
  isVisibe,
  setVisible,
  setMechanicsType,
  currentType,
}: MechanicsTypeProps) {
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const newTypeRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useKeyEnterWithInput({
    func: (e: any) => handleAddType(e),
    inputRef: newTypeRef,
  });
  useClearOnTime({ setText: setErrorMessage, text: errorMessage });
  /** Добавление типа */
  async function handleAddType(typeName: string) {
    if (types.some((type) => type.type === typeName)) {
      setErrorMessage("Mechanic type already exists");
      return;
    }

    try {
      const res = await createMechnanicsTypeAPI(typeName, gddId);

      if (!res.success) {
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: res.message })
        );
        return;
      }

      dispatch(addMechanicType(res.type));
      setMechanicsType(res.type.id);
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    }
  }

  /** Удаление типа */
  async function handleDeleteType(type: MechanicType) {
    try {
      const res = await deleteMechnanicsTypeAPI(type.id);

      if (!res.success) {
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: res.message })
        );
        return;
      }

      if (currentType === type.id) {
        setMechanicsType("null");
      }

      dispatch(deleteMechanicType(type.id));
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    }
  }

  return (
    <Modal
      isOpen={isVisibe}
      ariaHideApp={false}
      style={{
        content: {
          border: "none",
          background: "none",
          overflow: "hidden",
          height: "100vh",
          transform: "none",
          position: "absolute",
        },
        overlay: {
          zIndex: 1000,
        },
      }}
    >
      <div className={form_styles.submit_form}>
        <h2>Types</h2>
        <div className={form_styles.form_group}>
          <input
            data-testid="types-modal-input-test"
            placeholder="new"
            id="new_type"
            name="new_type"
            type="text"
            ref={newTypeRef}
          />
        </div>
        <ul>
          {types.map((type) => (
            <li key={type.id}>
              <span>{type.type}</span>
              <button
                className={button_styles.create_btn}
                onClick={() => handleDeleteType(type)}
              >
                {icons.delete}
              </button>
            </li>
          ))}
        </ul>

        {errorMessage && (
          <div className={`${form_styles.form_group} ${form_styles.error}`}>
            {errorMessage}
          </div>
        )}

        <div className={form_styles.form_footer}>
          <button
            data-testid="close_modal"
            type="button"
            className={button_styles.create_btn}
            onClick={() => setVisible(false)}
          >
            CLOSE
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default MechanicsTypeModal;
