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
import { createCharacterAPI } from "@services/charactersAPI";
import { setLoading } from "@store/slices/loaderSlice";

const initialFormData: NewCharacter = {
  id: "",
  name: "",
  role: "",
  abilities: [],
  traits: [],
  backstory: "",
  img: "",
  imageInstance: null,
  //additionalImages: [],
  // gddId: "",
};

export default function NewCharacterForm() {
  const [formData, setFormData] = useState<NewCharacter>(initialFormData);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const dispatch = useDispatch();

  const currentLang = useCurrentLanguage();
  const loc = characterFormTranslator[currentLang];

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    dispatch(setLoading(true));

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("gdd_id", gddId);
      dataToSend.append("abilities", JSON.stringify(formData.abilities));
      dataToSend.append("traits", JSON.stringify(formData.traits));
      dataToSend.append("role", formData.role);
      dataToSend.append("backstory", formData.backstory);
      if (formData.imageInstance) {
        dataToSend.append("character", formData.imageInstance); // Только если файл есть
      }
      const res = await createCharacterAPI(dataToSend);

      if (res.success) {
        dispatch(addCharacter(res.character));
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: loc.success })
        );
        setFormData(initialFormData);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }

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
