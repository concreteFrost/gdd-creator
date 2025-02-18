import { useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@styles/overrides/quill_override.scss";
import * as form_style from "./GameplayForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { GameObjective, GamePlay, GameProgression } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import { v4 as uuidv4 } from "uuid";
import { GameplayFormTranslator } from "./localisation/gameplayFormTranslator";
import PressKeyHint from "@components/Hints/PressKeyHint";

interface FormProps {
  handleFormSubmit: () => void;
  formData: GamePlay;
  setFormData: (value: any) => void;
  t: GameplayFormTranslator;
}

function GameplayForm({
  formData,
  setFormData,
  handleFormSubmit,
  t,
}: FormProps) {
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
        progressions: [...prev.progressions, newProgression],
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
          <label htmlFor="story">{t.story}</label>
          <ReactQuill
            id="story"
            data-testid="test-story"
            value={formData.story}
            onChange={(e: any) => {
              handleInputChange(e, "story");
            }}
          ></ReactQuill>
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="objectives">{t.objectives}</label>
          <PressKeyHint></PressKeyHint>
          <input
            data-testid="test-objectives"
            type="text"
            id="objectives"
            name="objectives"
            ref={objectivesInputRef}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="progression">{t.progression}</label>
          <PressKeyHint></PressKeyHint>
          <input
            data-testid="test-progression"
            type="text"
            id="progression"
            name="progression"
            ref={progressionInputRef}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="difficulty">{t.difficulty}</label>
          <input
            data-testid="test-difficulty"
            type="text"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={(e) => handleInputChange(e.target.value, "difficulty")}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="pacing">{t.pacing}</label>
          <input
            data-testid="test-pacing"
            type="text"
            id="pacing"
            name="pacing"
            value={formData.pacing}
            onChange={(e) => handleInputChange(e.target.value, "pacing")}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="player-experience">{t.player_experience}</label>
          <input
            data-testid="test-player-experience"
            type="text"
            id="player-experience"
            name="player-experience"
            value={formData.player_experience}
            onChange={(e) =>
              handleInputChange(e.target.value, "player_experience")
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
            {t.save}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameplayForm;
