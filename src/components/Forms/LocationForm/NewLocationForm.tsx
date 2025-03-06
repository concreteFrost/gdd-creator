import React, { FormEvent, useState } from "react";
import LocationForm from "./LocationForm";
import { NewGameLocation } from "@_types/gddTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { addLocation } from "@store/slices/locationsSlice";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { locationsFormTranslator } from "./localisation/locationFormTranslator";
import { createLocationAPI } from "@services/locationsAPI";
import { setLoading } from "@store/slices/loaderSlice";

const initialFormData: NewGameLocation = {
  id: "",
  name: "",
  description: "",
  environment: "",
  characters: [],
  img: "",
  imageInstance: null,
};

export default function NewLocationForm() {
  const currentLanguage = useCurrentLanguage();
  const loc = locationsFormTranslator[currentLanguage];
  const [formData, setFormData] = useState<NewGameLocation>(initialFormData);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const dispatch = useDispatch();

  async function handleFormSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<boolean> {
    e.preventDefault();

    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("description", formData.description);
    dataToSend.append("environment", formData.environment);
    dataToSend.append("gdd_id", gddId);
    dataToSend.append("characters", JSON.stringify(formData.characters));

    if (formData.imageInstance) {
      dataToSend.append("location", formData.imageInstance); // Только если файл есть
    }

    dispatch(setLoading(true));

    try {
      const res = await createLocationAPI(dataToSend);
      console.log(res);

      if (res.success) {
        dispatch(addLocation(res.location));
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: loc.successMessage })
        );
        setFormData(initialFormData);
      }

      return true;
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <LocationForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      language={loc}
    ></LocationForm>
  );
}
