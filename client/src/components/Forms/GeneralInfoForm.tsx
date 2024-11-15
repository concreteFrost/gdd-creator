import { RootState } from "@store/store";
import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameView, GamePlatform, GDD } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useState, useEffect } from "react";

function GeneralInfoForm() {
  const gdd = useSelector((state: RootState) => state.gddSlice);
  const [formData, setFormData] = useState<GDD>(gdd);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useClearOnTime({ setText: setErrorMessage, text: errorMessage });

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

  return (
    <form className={form_style.general_info_form}>
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

      {errorMessage.length > 0 ? (
        <div className={`${form_style.form_group} ${form_style.error}`}>
          {errorMessage}
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
