import { RootState } from "@store/store";
import React from "react";
import { useSelector } from "react-redux";
import * as overviewStyles from "@styles/modules/overview.module.scss";
import ReactQuill from "react-quill-new";
import { GameObjective, GameProgression } from "@_types/gddTypes";

export default function OverviewGameplay() {
  const {
    story,
    objectives,
    progression,
    difficulty,
    pacing,
    playerExperience,
  } = useSelector((state: RootState) => state.gameplaySlice.gameplay);

  const formatedStory = story;

  return (
    <div className={overviewStyles.overview_container}>
      <h2 className={overviewStyles.overview_header}>Gameplay</h2>
      <section>
        <p>
          <strong>Difficulty:</strong> {difficulty}
        </p>
        <p>
          <strong>Pacing:</strong> {pacing}
        </p>
        <p>
          <strong>Player Experience:</strong> {playerExperience}
        </p>
      </section>
      <ReactQuill
        value={story}
        readOnly={true}
        theme="bubble"
        className={overviewStyles.long_text}
      ></ReactQuill>
      <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr" }}>
        {objectives.length > 0 ? (
          <div className={overviewStyles.list_section}>
            <p>
              <strong>Objectives:</strong>
            </p>
            <ul>
              {objectives.map((objective: GameObjective) => (
                <li key={objective.id}>{objective.name}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {progression.length > 0 ? (
          <div className={overviewStyles.list_section}>
            <p>
              <strong>Progression:</strong>
            </p>

            <ul>
              {progression.map((progression: GameProgression) => (
                <li key={progression.id}>{progression.name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
