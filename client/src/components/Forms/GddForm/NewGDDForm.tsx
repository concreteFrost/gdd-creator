import React, { FormEvent, useState } from "react";
import { GamePlatform, GameView, GDD } from "@_types/gddTypes";
import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import withModalWindow from "@components/_hoc/withModalWindow";
import { useDispatch } from "react-redux";
import { createGDD } from "@store/slices/gddSlice";
import { RootState } from "@store/store";
import useClearOnTime from "@hooks/useClearOnTime";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { initialState } from "@store/slices/gddSlice";

interface Props {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

function NewGDDForm({ isVisible, setVisible }: Props) {
  const [formData, setFormData] = useState<GDD>(initialState.gdd);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.title.length <= 0) {
      setErrorMessage("*Title field is required");
      return;
    }

    dispatch(createGDD(formData));
    handleCloseModal();
    navigate("/gdd/info");
  }

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
      <form onSubmit={handleSubmit} className={form_style.submit_form}>
        <h2>Game Design Document (GDD)</h2>

        <div className={form_style.form_group}>
          <label htmlFor="title">Title*</label>
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
          <button
            data-testid="close_modal"
            type="button"
            className={button_styles.cancel_btn}
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewGDDForm;
