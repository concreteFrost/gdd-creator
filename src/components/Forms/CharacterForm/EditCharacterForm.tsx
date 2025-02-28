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
import { updateCharacterAPI } from "@services/charactersAPI";
import { setLoading } from "@store/slices/loaderSlice";

export default function EditCharacterForm() {
  const dispatch = useDispatch();
  const { characterId } = useParams<{ characterId: string }>();

  const selectedCharacter = useSelector((state: RootState) =>
    state.charactersSlice.characters.find(
      (character: Character) => character.id == characterId
    )
  );

  const currentLang = useCurrentLanguage();
  const loc = characterFormTranslator[currentLang];

  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  // Состояние формы
  const [formData, setFormData] = useState<NewCharacter | null>(null);

  useEffect(() => {
    if (selectedCharacter) {
      setFormData({ ...selectedCharacter, imageInstance: null });
    }
  }, [selectedCharacter]);

  if (!selectedCharacter || !formData) {
    return <div>{loc.characterNotFound}</div>;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<boolean> {
    e.preventDefault();

    if (!formData || !selectedCharacter) return false;

    if (formData.name.length <= 0) {
      console.log("name is required");
      return false;
    }

    dispatch(setLoading(true));
    try {
      const dataToSend = new FormData();
      dataToSend.append("id", selectedCharacter.id);
      dataToSend.append("name", formData.name);
      dataToSend.append("gdd_id", gddId);
      dataToSend.append("abilities", JSON.stringify(formData.abilities));
      dataToSend.append("traits", JSON.stringify(formData.traits));
      dataToSend.append("role", formData.role);
      dataToSend.append("backstory", formData.backstory);
      dataToSend.append("imagePath", formData.img ?? "null");

      if (formData.imageInstance) {
        dataToSend.append("character", formData.imageInstance);
      }

      const res = await updateCharacterAPI(dataToSend);

      if (res.success) {
        dispatch(editCharacter(res.character));
        console.log(res.character);
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: loc.success })
        );
      }
    } catch (error) {
      console.log("errrr", error);
    } finally {
      dispatch(setLoading(false));
    }

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
