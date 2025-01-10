import GameplayForm from "@components/Forms/GameplayForm/GameplayForm";
import { GameObjective, GamePlay, GameProgression } from "@_types/gddTypes";
import { useEffect, useState } from "react";
import GameplayList from "@components/Lists/GameplayList/GameplayList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { createGameplay, editGameplay } from "@store/slices/gameplaySlice";
import { v4 as uuidv4 } from "uuid";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import * as style from "./styles/GameplayView.module.scss"
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gamplayFormTranslator } from "@components/Forms/GameplayForm/localisation/gameplayFormTranslator";

const initialFormData: GamePlay = {
  id: "",
  gddId: "",
  story: "",
  objectives: [],
  progression: [],
  difficulty: "",
  pacing: "",
  playerExperience: "",
};

function GameplayView() {
  const [formData, setFormData] = useState<GamePlay>(initialFormData);
  const { gameplay } = useSelector((state: RootState) => state.gameplaySlice);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const dispatch = useDispatch();

  const currentLang= useCurrentLanguage();
  const loc = gamplayFormTranslator[currentLang];

  useEffect(() => {
    if (gameplay.id !== "") {
      console.log("id is not null");

      setFormData(gameplay);
    }
  }, [gameplay]);

  function handleFormSubmit() {
    if (gameplay.id !== "") {
      dispatch(editGameplay(formData));
      dispatch(showModal({ activeModal: ActiveModal.Info, text: "Success" }));
      return;
    }
    const id = uuidv4();
    dispatch(createGameplay({ ...formData, id: id, gddId: gddId }));
    dispatch(showModal({ activeModal: ActiveModal.Info, text: "Success" }));
  }

  function deleteObjective(item: GameObjective) {
    const filteredObjectives = formData.objectives.filter(
      (obj: GameObjective) => obj.id !== item.id
    );
    setFormData((prev) => {
      return {
        ...prev,
        objectives: filteredObjectives,
      };
    });
  }

  function deleteProgression(item: GameProgression) {
    const filteredProgressions = formData.progression.filter(
      (obj: GameProgression) => obj.id !== item.id
    );
    setFormData((prev) => {
      return {
        ...prev,
        progression: filteredProgressions,
      };
    });
  }

  return (
    <div
      className={style.container}
    >
      <div className={style.gameplay_form}>
        <GameplayForm
          t={loc}
          handleFormSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
        ></GameplayForm>
      </div>

      <div className={style.gameplay_list_container}>
        <GameplayList
          deleteItem={(item: GameObjective) => deleteObjective(item)}
          title={`${loc.objectives}:`}
          item={formData.objectives}
          renderItem={(item: GameObjective) => <>{item.name}</>}
        ></GameplayList>
        <GameplayList
          deleteItem={(item: GameProgression) => deleteProgression(item)}
          title={`${loc.progression}:`}
          item={formData.progression}
          renderItem={(item: GameProgression) => <>{item.name}</>}
        ></GameplayList>
      </div>
    </div>
  );
}

export default GameplayView;
