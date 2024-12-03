import { useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@styles/overrides/quill_override.scss";
import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { GameObjective, GamePlay, GameProgression } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import { v4 as uuidv4 } from "uuid";

interface FormProps {
  handleFormSubmit: () => void;
  formData: GamePlay;
  setFormData: (value: any) => void;
}

function GameplayForm({ formData, setFormData, handleFormSubmit }: FormProps) {
  const objectivesInputRef: any = useRef<HTMLInputElement>(null);
  const progressionInputRef: any = useRef<HTMLInputElement>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  useKeyEnterWithInput({
    func: (e: any) => addObjectives(e),
    inputRef: objectivesInputRef,
  });
  useKeyEnterWithInput({
    func: (e: any) => addProgression(e),
    inputRef: progressionInputRef,
  });

  function submitForm(e: any) {
    e.preventDefault();
    handleFormSubmit();
  }

  function addObjectives(value: any) {
    const newObjective: GameObjective = {
      id: uuidv4(),
      name: value,
    };
    setFormData((prev: GamePlay) => {
      return {
        ...prev,
        objectives: [...prev.objectives, newObjective],
      };
    });
  }

  function addProgression(value: any) {
    const newProgression: GameProgression = {
      id: uuidv4(),
      name: value,
    };
    setFormData((prev: GamePlay) => {
      return {
        ...prev,
        progression: [...prev.progression, newProgression],
      };
    });
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
    <div>
      <form className={form_style.gameplay_form} onSubmit={submitForm}>
        <div className={form_style.form_group}>
          <label htmlFor="story">Story</label>
          <ReactQuill
            id="story"
            data-testid="test-story"
            value={formData.story}
            onChange={(e: any) => {
              handleInputChange(e, "story");
            }}
          ></ReactQuill>
        </div>

        <div className={form_style.form_group} style={{ width: "100%" }}>
          <label htmlFor="objectives" style={{ position: "relative" }}>
            Objectives
          </label>
          <span className={form_style.hint}>press enter to add</span>
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
          <span className={form_style.hint}>press enter to add</span>
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
    </div>
  );
}

export default GameplayForm;
