import { RootState } from "@store/store";
import * as form_style from "./GDDForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameView, GamePlatform, GDD } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useEffect, useState } from "react";
import { editGeneralInfo } from "@store/slices/gddSlice";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { FormEvent } from "react";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "./localisation/gddFormTranslator";
import { updateGDDAPI } from "@services/gddAPI";

function EditGddForm() {
  const gdd = useSelector((state: RootState) => state.gddSlice);
  const [formData, setFormData] = useState<GDD>(gdd.gdd);

  useEffect(() => {
    setFormData(gdd.gdd);
  }, [gdd]);

  const [submitMessage, setSubmitMessage] = useState<string>("");
  const dispatch = useDispatch();

  const currentLang = useCurrentLanguage();
  const loc = gddFormTranslator[currentLang];

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

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.title.length <= 0) {
      setSubmitMessage(loc.titleRequired);
      return;
    }

    try {
      const updateGDDResponse = await updateGDDAPI({
        ...formData,
        id: gdd.gdd.id,
      });

      if (updateGDDResponse.success) {
        dispatch(editGeneralInfo(formData));
        dispatch(
          showModal({ activeModal: ActiveModal.Info, text: loc.successMessage })
        );
      }
    } catch (error: any) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "something went wrong",
        })
      );
    }
  }

  return (
    <form className={form_style.general_info_form} onSubmit={handleFormSubmit}>
      <div className={form_style.form_group}>
        <label htmlFor="title">{loc.title}</label>
        <input
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

      {submitMessage.length > 0 ? (
        <div className={`${form_style.form_group} ${form_style.error}`}>
          {submitMessage}
        </div>
      ) : null}

      <div className={form_style.form_footer}>
        <button type="submit" className={button_styles.create_btn}>
          {loc.saveButton}
        </button>
      </div>
    </form>
  );
}

export default EditGddForm;
