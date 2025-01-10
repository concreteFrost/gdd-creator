import React, { FormEvent, useState } from "react";
import CharacterForm from "./CharacterForm";
import { NewCharacter } from "@_types/gddTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { addCharacter } from "@store/slices/characterSlices";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { characterFormTranslator } from "./localisation/characterFormTranslator";

const initialFormData: NewCharacter = {
  name: "",
  role:"",
  abilities:[],
  traits:[],
  backstory: "",
  mainImage: {
    id: "",
    path: "",
  },
  additionalImages: [],
  gddId: ""
};

export default function NewCharacterForm() {
  const [formData, setFormData] = useState<NewCharacter>(initialFormData);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const dispatch = useDispatch();

   const currentLang = useCurrentLanguage();
    const loc = characterFormTranslator[currentLang];

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    const newCharacter: NewCharacter = { ...formData, gddId: gddId };
    dispatch(addCharacter(newCharacter));
    dispatch(showModal({ activeModal: ActiveModal.Info, text: loc.success }));
    setFormData(initialFormData);
    return true;
  }

  return (
    <CharacterForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleFormSubmit}
      t={loc}
    ></CharacterForm>
  );
}
