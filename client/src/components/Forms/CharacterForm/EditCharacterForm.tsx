import { Character, GameLocation, NewCharacter } from "@_types/gddTypes";
import React, { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "@store/store";
import { editCharacter } from "@store/slices/characterSlices";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import CharacterForm from "./CharacterForm";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { characterFormTranslator } from "./localisation/characterFormTranslator";

const initialFormData: Character = {
  id: "",
  name: "",
  role: "",
  abilities: [],
  traits: [],
  backstory: "",
  mainImage: {
    id: "",
    path: "",
  },
  //additionalImages: [],
  gddId: "",
};

export default function EditCharacterForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Character>(initialFormData);
  const { characterId } = useParams<{ characterId: string }>();

  const currentLang = useCurrentLanguage();
  const loc = characterFormTranslator[currentLang];

  const selectedCharacter = useSelector((state: RootState) =>
    state.charactersSlice.characters.find(
      (character: Character) => character.id == characterId
    )
  );

  useEffect(() => {
    if (selectedCharacter) {
      setFormData(selectedCharacter);
    }
  }, [characterId]);

  if (!selectedCharacter) {
    return <div>{loc.characterNotFound}</div>;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): boolean {
    e.preventDefault();
    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    dispatch(editCharacter(formData));
    dispatch(showModal({ activeModal: ActiveModal.Info, text: loc.success }));

    return true;
  }

  return (
    <CharacterForm
      formData={formData}
      setFormData={setFormData}
      handleFormSubmit={handleSubmit}
      t={loc}
    />
  );
}
