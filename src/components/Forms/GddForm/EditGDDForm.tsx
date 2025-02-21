import { RootState } from "@store/store";
import * as form_style from "./GDDForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameView, GamePlatform, GDD } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useActionState, useEffect, useState } from "react";
import { editGeneralInfo } from "@store/slices/gddSlice";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "./localisation/gddFormTranslator";
import { updateGDDAPI } from "@services/gddAPI";

function EditGddForm() {
  const gdd = useSelector((state: RootState) => state.gddSlice.gdd);

  const [data, action, isPengding] = useActionState(handlSumbit, gdd);

  async function handlSumbit(prevState: any, data: FormData): Promise<any> {
    const toSubmit: GDD = {
      id: gdd.id,
      title: data.get("title") as string,
      genre: data.get("genre") as string,
      view: data.get("view") as GameView,
      platform: data.get("platform") as GamePlatform,
    };

    try {
      const updateGDDResponse = await updateGDDAPI(toSubmit);

      if (updateGDDResponse.success) {
        dispatch(editGeneralInfo(toSubmit));
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

  const [submitMessage, setSubmitMessage] = useState<string>("");
  const dispatch = useDispatch();

  const currentLang = useCurrentLanguage();
  const loc = gddFormTranslator[currentLang];

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });

  return (
    <>
      <form className={form_style.general_info_form} action={action}>
        <div className={form_style.form_group}>
          <label htmlFor="title">{loc.title}</label>
          <input type="text" id="title" name="title" defaultValue={gdd.title} />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="genre">{loc.genre}</label>
          <input
            type="text"
            id="genre"
            name="genre"
            defaultValue={gdd.genre}
            required
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="view">{loc.view}</label>
          <select id="view" key={gdd.view} name="view" defaultValue={gdd.view}>
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
            key={gdd.platform}
            defaultValue={gdd.platform}
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

      {isPengding ? "submitting..." : ""}
    </>
  );
}

export default EditGddForm;
