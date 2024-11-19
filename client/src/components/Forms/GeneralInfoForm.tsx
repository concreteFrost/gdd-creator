import { RootState } from "@store/store";
import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameView, GamePlatform, GDD } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useState } from "react";
import { editGeneralInfo } from "@store/slices/gddSlice";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { FormEvent } from "react";

function GeneralInfoForm() {
  const gdd = useSelector((state: RootState) => state.gddSlice);
  const [formData, setFormData] = useState<GDD>(gdd);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const dispatch = useDispatch();

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.title.length <= 0) {
      setSubmitMessage("Title is required");
      return;
    }

    dispatch(editGeneralInfo(formData));

    dispatch(showModal({ activeModal: ActiveModal.Info, text: "Success" }));
  }

  return (
    <form className={form_style.general_info_form} onSubmit={handleFormSubmit}>
      <div className={form_style.form_group}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className={form_style.form_group}>
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
      </div>

      <div className={form_style.form_group}>
        <label htmlFor="view">Game View</label>
        <select
          id="view"
          name="view"
          value={formData.view}
          onChange={handleInputChange}
        >
          {Object.values(GameView).map((view) => (
            <option key={view} value={view}>
              {view}
            </option>
          ))}
        </select>
      </div>

      <div className={form_style.form_group}>
        <label htmlFor="platform">Platform</label>
        <select
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleInputChange}
        >
          {Object.values(GamePlatform).map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      {submitMessage.length > 0 ? (
        <div className={`${form_style.form_group} ${form_style.error}`}>
          {submitMessage}
        </div>
      ) : null}

      <div className={form_style.form_footer}>
        <button type="submit" className={button_styles.create_btn}>
          Save
        </button>
      </div>
    </form>
  );
}

export default GeneralInfoForm;
