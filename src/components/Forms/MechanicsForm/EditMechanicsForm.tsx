import { useDispatch, useSelector } from "react-redux";
import { GameMechanic } from "@_types/gddTypes";
import { useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import MechanicsForm from "./MechanicsForm";
import { useState } from "react";
import { RootState } from "@store/store";
import { showModal } from "@store/slices/modalSlice";
import { editMechanic } from "@store/slices/mechanicsSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { useParams } from "react-router-dom";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { mechanicsFormTranslator } from "./localisation/mechanicsFormTranslator";
import { updateMechanicAPI } from "@services/mechanicsAPI";
import { setLoading } from "@store/slices/loaderSlice";

const initialState: GameMechanic = {
  id: "",
  name: "",
  description: "",
  type_id: null,
  examples: [],
};

function EditMechanicForm() {
  const { mechanicId } = useParams<{ mechanicId: string }>(); // Extract mechanicId from route params
  const { selectedGDD } = useSelector((state: RootState) => state.authSlice);
  // Retrieve the selected mechanic based on the ID from route params
  const selectedMechanic = useSelector((state: RootState) =>
    state.mechanicsSlice.mechanics.find(
      (mech: GameMechanic) => mech.id === mechanicId
    )
  );

  if (!selectedMechanic) return <>Not found</>;

  const [formData, setFormData] = useState<GameMechanic>(initialState);
  const dispatch = useDispatch();
  const currentLanguage = useCurrentLanguage();
  const loc = mechanicsFormTranslator[currentLanguage];

  useEffect(() => {
    if (selectedMechanic) {
      setFormData(selectedMechanic);
    }
  }, [selectedMechanic]); // Обновляем formData при изменении selectedMechanic

  async function handleFormSubmit(): Promise<boolean> {
    if (formData.name.length <= 0) return false;

    dispatch(setLoading(true));
    try {
      const res = await updateMechanicAPI({
        ...formData,
        gdd_id: selectedGDD!,
      });

      if (res.success) {
        dispatch(editMechanic(res.mechanic));
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: loc.success })
        );
      }
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    } finally {
      dispatch(setLoading(false));
    }

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

export default EditMechanicForm;
