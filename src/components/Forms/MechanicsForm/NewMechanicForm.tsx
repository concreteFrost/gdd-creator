import { useDispatch, useSelector } from "react-redux";
import { NewMechnicForm } from "@_types/gddTypes";
import { FormEvent } from "react";
import "react-quill-new/dist/quill.snow.css";
import MechanicsForm from "./MechanicsForm";
import { useState } from "react";
import { RootState } from "@store/store";
import { showModal } from "@store/slices/modalSlice";
import { addMechanic } from "@store/slices/mechanicsSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { mechanicsFormTranslator } from "./localisation/mechanicsFormTranslator";
import { createMechanicAPI } from "@services/mechanicsAPI";
import { setLoading } from "@store/slices/loaderSlice";

const initialState = {
  name: "",
  description: "",
  type_id: null,
  examples: [],
};

function NewMechanicForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<NewMechnicForm>(initialState);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  const currentLanguage = useCurrentLanguage();
  const loc = mechanicsFormTranslator[currentLanguage];

  async function handleFormSubmit(): Promise<boolean> {
    if (formData.name.length <= 0) return false;

    dispatch(setLoading(true));
    try {
      const res = await createMechanicAPI({ ...formData, gdd_id: gddId });

      if (res.success) {
        dispatch(addMechanic(res.mechanic));
      }
    } catch (error) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "something went wrong",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }

    dispatch(showModal({ activeModal: ActiveModal.Info, text: loc.success }));
    setFormData(initialState);

    return true;
  }

  return (
    <MechanicsForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      language={loc}
    ></MechanicsForm>
  );
}

export default NewMechanicForm;
