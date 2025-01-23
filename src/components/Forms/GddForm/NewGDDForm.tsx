import React, { FormEvent, useState } from "react";
import { GamePlatform, GameView, GDD } from "@_types/gddTypes";
import * as form_style from "./GDDForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { useDispatch } from "react-redux";
import { createGDD } from "@store/slices/gddSlice";
import useClearOnTime from "@hooks/useClearOnTime";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { initialState } from "@store/slices/gddSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "./localisation/gddFormTranslator";
import { createGDDAPI } from "@services/gddAPI";
import { setSelectedGDD } from "@store/slices/authSlice";
interface Props {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

function NewGDDForm({ isVisible, setVisible }: Props) {
  const [formData, setFormData] = useState<GDD>(initialState.gdd);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentLang = useCurrentLanguage();
  const loc = gddFormTranslator[currentLang];

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.title.length <= 0) {
      setErrorMessage(loc.titleRequired);
      return;
    }

    try {
      const gddResponse = await createGDDAPI(
        formData.title,
        formData.genre,
        formData.view,
        formData.platform
      );

      if (gddResponse.success) {
        // dispatch(createGDD(gddResponse.gdd));
        dispatch(setSelectedGDD(gddResponse.gdd.id));
        handleCloseModal();
        navigate("/gdd/info");
      }
    } catch (error) {
      console.log("error", error);
    }

    // dispatch(createGDD(formData));
  };

  function handleCloseModal() {
    setVisible(false);
  }

  return (
    <Modal
      isOpen={isVisible}
      ariaHideApp={false}
      style={{
        content: { border: "none", background: "none" },
      }}
    >
      <form onSubmit={handleSubmit} className={form_style.general_info_form}>
        <h2>Game Design Document (GDD)</h2>

        <div className={form_style.form_group}>
          <label htmlFor="title">{loc.title}</label>
          <input
            data-testid="title_input"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="genre">{loc.genre}</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="view">{loc.view}</label>
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
          <label htmlFor="platform">{loc.platform}</label>
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
            {loc.saveButton}
          </button>
          <button
            data-testid="close_modal"
            type="button"
            className={button_styles.cancel_btn}
            onClick={handleCloseModal}
          >
            {loc.closeButton}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewGDDForm;
