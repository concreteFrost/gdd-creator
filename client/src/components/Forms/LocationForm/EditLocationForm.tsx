import { GameLocation } from "@_types/gddTypes";
import React, { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "@store/store";
import { editLocation } from "@store/slices/locationsSlice";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import LocationForm from "./LocationForm";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { locationsFormTranslator } from "./localisation/locationFormTranslator";

const initialFormData: GameLocation = {
  id: "",
  name: "",
  gddId: "",
  description: "",
  environment: "",
  characters: [],
  items: [],
  mainImage: {
    id: "",
    path: "",
  },
  additionalImages: [],
};

export default function EditLocationForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<GameLocation>(initialFormData);
  const { locationId } = useParams<{ locationId: string }>();
  const currentLanguage = useCurrentLanguage();
  const loc = locationsFormTranslator[currentLanguage];

  const selectedLocation = useSelector((state: RootState) =>
    state.locationsSlice.locations.find(
      (location: GameLocation) => location.id == locationId
    )
  );

  useEffect(() => {
    if (selectedLocation) {
      setFormData(selectedLocation);
    }
  }, [locationId]);

  if (!selectedLocation) {
    return <div>Location was not found</div>;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): boolean {
    e.preventDefault();
    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    dispatch(editLocation(formData));
    dispatch(showModal({ activeModal: ActiveModal.Info, text: loc.successMessage }));

    return true;
  }

  return (
    <LocationForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleSubmit}
      language={loc}
    />
  );
}
