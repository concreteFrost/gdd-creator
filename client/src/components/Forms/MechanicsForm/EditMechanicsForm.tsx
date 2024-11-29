import { useDispatch, useSelector } from "react-redux";
import { GameMechanic } from "@_types/gddTypes";
import { FormEvent, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import MechanicsForm from "./MechanicsForm";
import { useState } from "react";
import { RootState } from "@store/store";
import { showModal } from "@store/slices/modalSlice";
import { editMechanic } from "@store/slices/mechanicsSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { useParams } from "react-router-dom";

const initialState: GameMechanic = {
  id: "",
  name: "",
  description: "",
  typeId: "undefined",
  interactions: [],
  examples: [],
  gddId: "",
};

function EditMechanicForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<GameMechanic>(initialState);
  const { mechanicId } = useParams<{ mechanicId: string }>(); // Extract mechanicId from route params

  // Retrieve the selected mechanic based on the ID from route params
  const selectedMechanic = useSelector((state: RootState) =>
    state.mechanicsSlice.mechanics.find(
      (mech: GameMechanic) => mech.id === mechanicId
    )
  );

  useEffect(() => {
    if (selectedMechanic) {
      setFormData(selectedMechanic);
    }
  }, [mechanicId]);

  if (!selectedMechanic) return <>Not found</>;

  function handleFormSubmit(e: FormEvent<HTMLFormElement>): boolean {
    e.preventDefault();
    if (formData.name.length <= 0 || formData.typeId === "undefined") {
      console.log("not all fields were completed");
      return false;
    }

    dispatch(editMechanic(formData));
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

export default EditMechanicForm;
