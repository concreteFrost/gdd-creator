import * as button_styles from "@components/Buttons/Button.module.scss";
import * as form_styles from "./Modal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { RootState } from "@store/store";
import { v4 as uuidv4 } from "uuid";
import { MechanicType } from "@_types/gddTypes";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import useClearOnTime from "@hooks/useClearOnTime";
import {
  addMechanicType,
  deleteMechanicType,
} from "@store/slices/mechanicsTypeSlice";
import Modal from "react-modal";
import { icons } from "@assets/icons";

interface MechanicsTypeProps {
  isVisibe: boolean;
  setVisible: (isVisible: boolean) => void;
  setMechanicsType: (id: string) => void;
  currentType: string
}

function MechanicsTypeModal({
  isVisibe,
  setVisible,
  setMechanicsType,
  currentType
}: MechanicsTypeProps) {
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const newTypeRef: any = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function handleAddType(e: any) {
    const newType: MechanicType = {
      id: uuidv4(),
      type: e,
    };

    const match = types.filter(
      (type: MechanicType) => type.type === newType.type
    );

    if (match.length > 0) {
      setErrorMessage("mechanic type already exists");
      return;
    }
    dispatch(addMechanicType(newType));
    setMechanicsType(newType.id);
  }

  function handleDeleteType(type: MechanicType) {
    if (currentType === type.id) {
      setMechanicsType("unspecified");
    }

    dispatch(deleteMechanicType(type.id));
  }

  useKeyEnterWithInput({
    func: (e: any) => handleAddType(e),
    inputRef: newTypeRef,
  });
  useClearOnTime({ setText: setErrorMessage, text: errorMessage });

  return (
    <Modal
      isOpen={isVisibe}
      ariaHideApp={false}
      style={{
        content: {
          border: "none",
          background: "none",
          position: "absolute",
          overflow: "hidden",
          height: "100vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
          ></input>
        </div>
        <ul>
          {types.length > 0
            ? types.map((type: MechanicType) => (
              <li key={type.id}>
                <span>{type.type}</span>
                <button
                  className={button_styles.create_btn}
                  onClick={() => handleDeleteType(type)}
                >
                  {icons.delete}
                </button>
              </li>
            ))
            : null}
        </ul>

        {errorMessage.length > 0 ? (
          <div className={`${form_styles.form_group} ${form_styles.error}`}>
            {errorMessage}
          </div>
        ) : null}

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
