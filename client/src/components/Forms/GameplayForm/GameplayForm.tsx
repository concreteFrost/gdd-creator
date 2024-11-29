import React, { useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@styles/overrides/quill_override.scss";
import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { GamePlay } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import useKeyEnter from "@hooks/useKeyEnter";

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

function GameplayForm() {
  const [formData, setFormData] = useState<GamePlay>(initialFormData);

  const objectivesInputRef: any = useRef<HTMLInputElement>(null);
  const progressionInputRef: any = useRef<HTMLInputElement>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  //   useKeyEnter({ func: (e: any) => handleSetExample(e), inputRef: inputRef });

  function submitForm(e: any) {
    e.preventDefault();
  }

  function handleInputChange(value: any, key: keyof GamePlay) {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }
  return (
    <form className={form_style.mechanic_form} onSubmit={submitForm}>
      <div className={form_style.form_group}>
        <label htmlFor="story">Story</label>
        <ReactQuill
          id="story"
          value={formData.story}
          onChange={(e: any) => {
            handleInputChange(e, "story");
          }}
        ></ReactQuill>
      </div>

      <div className={form_style.form_group} style={{ width: "100%" }}>
        <label htmlFor="objectives">Objectives</label>
        <input
          data-testid="test-objectives"
          type="text"
          id="objectives"
          name="objectives"
          ref={objectivesInputRef}
        />
      </div>

      <div className={form_style.form_group} style={{ width: "100%" }}>
        <label htmlFor="progression">Progression</label>
        <input
          data-testid="test-progression"
          type="text"
          id="progression"
          name="progression"
          ref={progressionInputRef}
        />
      </div>

      <div className={form_style.form_group} style={{ width: "100%" }}>
        <label htmlFor="difficulty">Difficulty</label>
        <input
          data-testid="test-difficulty"
          type="text"
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={(e) => handleInputChange(e.target.value, "difficulty")}
        />
      </div>

      <div className={form_style.form_group} style={{ width: "100%" }}>
        <label htmlFor="pacing">Pacing</label>
        <input
          data-testid="test-pacing"
          type="text"
          id="pacing"
          name="pacing"
          value={formData.pacing}
          onChange={(e) => handleInputChange(e.target.value, "pacing")}
        />
      </div>

      <div className={form_style.form_group} style={{ width: "100%" }}>
        <label htmlFor="player-experience">Player Experience</label>
        <input
          data-testid="test-player-experience"
          type="text"
          id="player-experience"
          name="player-experience"
          value={formData.playerExperience}
          onChange={(e) =>
            handleInputChange(e.target.value, "playerExperience")
          }
        />
      </div>

      {/* <div className={form_style.form_group}>
            <label htmlFor="description">Interactions</label>
          </div> */}

      {submitMessage.length > 0 ? (
        <div className={`${form_style.form_group} ${form_style.error}`}>
          {submitMessage}
        </div>
      ) : null}

      <div className={form_style.form_footer}>
        <button
          type="submit"
          className={button_styles.create_btn}
          data-testid="test-submit-form"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default GameplayForm;
