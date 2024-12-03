import { useDispatch, useSelector } from "react-redux";
import { NewMechnicForm } from "@_types/gddTypes";
import { FormEvent } from "react";
import "react-quill-new/dist/quill.snow.css";
import "@styles/overrides/quill_override.scss";
import MechanicsForm from "./MechanicsForm";
import { useState } from "react";
import { RootState } from "@store/store";
import { showModal } from "@store/slices/modalSlice";
import { addMechanic } from "@store/slices/mechanicsSlice";
import { ActiveModal } from "@store/slices/modalSlice";

const initialState: NewMechnicForm = {
  name: "",
  description: "",
  typeId: "undefined",
  interactions: [],
  examples: [],
  gddId: "",
};

function NewMechanicForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<NewMechnicForm>(initialState);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>): boolean {
    e.preventDefault();
    if (formData.name.length <= 0 || formData.typeId === "undefined") {
      console.log("not all fields were completed");
      return false;
    }

    const newMechanic = { ...formData, gddId: gddId };

    dispatch(addMechanic(newMechanic));
    dispatch(showModal({ activeModal: ActiveModal.Info, text: "Success" }));
    setFormData(initialState);

    return true;
  }

  return (
    <MechanicsForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
    ></MechanicsForm>
  );
}

export default NewMechanicForm;
