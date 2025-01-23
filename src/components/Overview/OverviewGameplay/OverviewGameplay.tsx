import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import * as overviewStyles from "./OverviewGameplay.module.scss";
import ReactQuill from "react-quill-new";
import { GameObjective, GameProgression } from "@_types/gddTypes";
import { sidebarTranslator } from "@components/Sidebar/localisation/sidebarTranslator";
import { gamplayFormTranslator } from "@components/Forms/GameplayForm/localisation/gameplayFormTranslator";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { useRef } from "react";

export default function OverviewGameplay() {
  const {
    story,
    objectives,
    progression,
    difficulty,
    pacing,
    player_experience,
  } = useSelector((state: RootState) => state.gameplaySlice.gameplay);

  const currentLang = useCurrentLanguage();
  const headerName = sidebarTranslator[currentLang].gameplay;
  const paragraphNames = gamplayFormTranslator[currentLang];

  return (
    <div className={overviewStyles.overview_container} id="gameplay">
      <h2 className={overviewStyles.overview_header}>{headerName}</h2>
      {story.length > 0 ? (
        <>
          <section className={overviewStyles.paragraph_sub_header}>
            <h2>{paragraphNames.story}</h2>
          </section>
          <ReactQuill
            value={story}
            readOnly={true}
            theme="bubble"
            className={overviewStyles.long_text}
          ></ReactQuill>
        </>
      ) : null}

      <div className={overviewStyles.grid}>
        <div className={overviewStyles.paragraph_element}>
          <header className={overviewStyles.paragraph_header}>
            {paragraphNames.difficulty} :{" "}
          </header>
          {difficulty}
        </div>
        <div className={overviewStyles.paragraph_element}>
          <div className={overviewStyles.paragraph_header}>
            {paragraphNames.pacing} :{" "}
          </div>
          {pacing}
        </div>
        <div className={overviewStyles.paragraph_element}>
          <div className={overviewStyles.paragraph_header}>
            {paragraphNames.player_experience} :{" "}
          </div>{" "}
          {player_experience}
        </div>
      </div>

      <section className={overviewStyles.paragraphs_container}>
        <div className={overviewStyles.paragraph_element}>
          <div className={overviewStyles.goals_and_progression}>
            {objectives.length > 0 ? (
              <div>
                <strong>{paragraphNames.objectives} :</strong>
                <ul>
                  {objectives.map((objective: GameObjective) => (
                    <li key={objective.id}>{objective.name}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {progression.length > 0 ? (
              <div>
                <strong>{paragraphNames.progression} :</strong>
                <ul>
                  {progression.map((progression: GameProgression) => (
                    <li key={progression.id}>{progression.name}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
