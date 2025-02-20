import { GameLocation, NewGameLocation } from "@_types/gddTypes";
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
import { updateLocationAPI } from "@services/locationsAPI";

const initialFormData: NewGameLocation = {
  id: "",
  name: "",
  description: "",
  environment: "",
  characters: [],
  img: "",
  imageInstance: null,
};

export default function EditLocationForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<NewGameLocation>(initialFormData);
  const { locationId } = useParams<{ locationId: string }>();
  const currentLanguage = useCurrentLanguage();
  const loc = locationsFormTranslator[currentLanguage];
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  const selectedLocation = useSelector((state: RootState) =>
    state.locationsSlice.locations.find(
      (location: GameLocation) => location.id == locationId
    )
  );

  useEffect(() => {
    if (selectedLocation) {
      setFormData({ ...selectedLocation, imageInstance: null });
    }
  }, [locationId]);

  if (!selectedLocation || !formData) {
    return <div>Location was not found</div>;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<boolean> {
    e.preventDefault();

    if (!formData || !selectedLocation) return false;

    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    const dataToSend = new FormData();
    dataToSend.append("id", selectedLocation.id);
    dataToSend.append("name", formData.name);
    dataToSend.append("description", formData.description);
    dataToSend.append("environment", formData.environment);
    dataToSend.append("gdd_id", gddId);
    dataToSend.append("characters", JSON.stringify(formData.characters));
    dataToSend.append("imagePath", formData.img ?? "null");

    if (formData.imageInstance) {
      dataToSend.append("location", formData.imageInstance); // Только если файл есть
    }

    try {
      const res = await updateLocationAPI(dataToSend);

      if (res.success) {
        dispatch(editLocation(res.location));
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: loc.successMessage })
        );
      }
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    }

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
