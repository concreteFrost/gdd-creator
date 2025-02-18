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
import * as style from "./styles/GameplayView.module.scss";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gamplayFormTranslator } from "@components/Forms/GameplayForm/localisation/gameplayFormTranslator";
import { updateGameplayAPI } from "@services/gameplayAPI";

const initialFormData: GamePlay = {
  id: "",
  // gddId: "",
  story: "",
  objectives: [],
  progressions: [],
  difficulty: "",
  pacing: "",
  player_experience: "",
};

function GameplayView() {
  const { gameplay } = useSelector((state: RootState) => state.gameplaySlice);
  const [formData, setFormData] = useState<GamePlay>(gameplay);

  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);
  const dispatch = useDispatch();

  const currentLang = useCurrentLanguage();
  const loc = gamplayFormTranslator[currentLang];

  async function handleFormSubmit() {
    const { id, ...data } = formData;

    try {
      const res = await updateGameplayAPI(data, gddId);

      if (res.success) {
        dispatch(editGameplay(res.gameplay));
        dispatch(showModal({ activeModal: ActiveModal.Info, text: loc.save }));
      } else {
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: res.message })
        );
      }
    } catch (error) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "Something went wrong",
        })
      );
    }
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
    const filteredProgressions = formData.progressions.filter(
      (obj: GameProgression) => obj.id !== item.id
    );
    setFormData((prev) => {
      return {
        ...prev,
        progressions: filteredProgressions,
      };
    });
  }

  return (
    <div className={style.container}>
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
          item={formData.progressions}
          renderItem={(item: GameProgression) => <>{item.name}</>}
        ></GameplayList>
      </div>
    </div>
  );
}

export default GameplayView;
