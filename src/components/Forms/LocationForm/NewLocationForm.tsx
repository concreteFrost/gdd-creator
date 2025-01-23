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

const initialFormData: NewGameLocation = {
  name: "",
  // gddId: "",
  description: "",
  environment: "",
  characters: [],
  //items: [],
  mainImage: {
    id: "",
    path: "",
  },
  //additionalImages: [],
};

export default function NewLocationForm() {
  const currentLanguage = useCurrentLanguage();
  const loc = locationsFormTranslator[currentLanguage];
  const [formData, setFormData] = useState<NewGameLocation>(initialFormData);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const dispatch = useDispatch();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    const newLocation: NewGameLocation = { ...formData };
    dispatch(addLocation(newLocation));
    dispatch(showModal({ activeModal: ActiveModal.Info, text: loc.save }));
    setFormData(initialFormData);
    return true;
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
