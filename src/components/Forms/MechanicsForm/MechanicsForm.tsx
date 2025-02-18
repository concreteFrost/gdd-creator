import * as form_style from "./MechanicsForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { GameMechanic, MechanicType } from "@_types/gddTypes";
import { FormEvent, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import "@styles/overrides/quill_override.scss";
import useClearOnTime from "@hooks/useClearOnTime";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import { useRef, useState } from "react";
import MechanicsTag from "@components/Tags/MechanicsTag";
import MechanicsTypeModal from "@components/Modal/MechanicsTypeModal";
import { MechanicFormElements } from "./localisation/mechanicsFormTranslator";
import PressKeyHint from "@components/Hints/PressKeyHint";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { RootState } from "@store/store";

export type NewMechnicForm = Omit<GameMechanic, "id" | "gddId">;

interface MechanicsFormProps {
  formData: NewMechnicForm;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<boolean>;
  language: MechanicFormElements;
}

export default function MechanicsForm({
  formData,
  setFormData,
  handleFormSubmit,
  language: t,
}: MechanicsFormProps) {
  const inputRef: any = useRef<HTMLInputElement>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [isTypeModalVisible, setTypeModalVisibe] = useState<boolean>(false);
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  const dispatch = useDispatch();

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });

  useKeyEnterWithInput({
    func: (e: any) => handleSetExample(e),
    inputRef: inputRef,
  });

  function setMechanicsType(value: string) {
    handleInputChange(value, "type_id");
  }

  function handleSetExample(e: any) {
    setFormData((prev: NewMechnicForm) => {
      // Проверяем, есть ли уже такая строка в массиве
      if (prev.examples.includes(e)) {
        return prev; // Если есть, просто возвращаем прежнее состояние
      }

      return {
        ...prev,
        examples: [...prev.examples, e],
      };
    });
  }

  function handleDeleteExample(id: string) {
    const filtered = formData.examples.filter((ex: string) => ex !== id);
    setFormData((prev: NewMechnicForm) => {
      return { ...prev, examples: filtered };
    });
  }

  function handleInputChange(value: any, key: keyof NewMechnicForm) {
    setFormData((prev: NewMechnicForm) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await handleFormSubmit(e);
      if (res === false) {
        setSubmitMessage(t.requiredError);
      }
    } catch (error) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "Something went wrong",
        })
      );
    }
  }

  return (
    <>
      <form className={form_style.mechanic_form} onSubmit={submitForm}>
        <div
          style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 20 }}
        >
          {/**Name */}
          <div className={form_style.form_group} style={{ width: "100%" }}>
            <label htmlFor="title">{t.nameLabel}</label>
            <input
              data-testid="test-title"
              type="text"
              id="title"
              name="title"
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.value, "name")}
            />
          </div>

          {/**TYPE SELECT */}
          <div className={form_style.form_group} style={{ width: "100%" }}>
            <label htmlFor="type">{t.typeLabel}</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "7fr 5fr",
                gap: 10,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <select
                data-testid="test-type-select"
                value={formData.type_id || "null"}
                onChange={(e: any) => {
                  handleInputChange(e.target.value, "type_id");
                }}
              >
                <option value={"null"}>{t.selectTypePlaceholder}</option>
                {types.map((type: MechanicType) => (
                  <option key={type.id} value={type.id}>
                    {type.type}
                  </option>
                ))}
              </select>
              <button
                data-testid="test-edit-types-btn"
                className={button_styles.create_btn}
                style={{ width: "150px" }}
                type="button"
                onClick={() => setTypeModalVisibe(true)}
              >
                {t.editTypesButton}
              </button>
            </div>
          </div>
        </div>

        {/**EXAMPLES */}
        <div className={form_style.form_group}>
          <label htmlFor="description" className={form_style.relative_label}>
            {t.examplesLabel}
          </label>
          <PressKeyHint></PressKeyHint>
          <input
            data-testid="test-example-input"
            type="text"
            style={{ marginBottom: 10 }}
            ref={inputRef}
          ></input>
        </div>

        {/**TAGS */}
        <div className={form_style.form_group}>
          {formData.examples.length > 0 ? (
            <MechanicsTag
              deleteTag={(item: string) => handleDeleteExample(item)}
              items={formData.examples}
              renderItem={(item: string) => <>{item}</>}
            ></MechanicsTag>
          ) : null}
        </div>

        {/**DESC */}
        <div className={form_style.form_group}>
          <label htmlFor="description">{t.descriptionLabel}</label>
          <textarea
            id="description"
            className={"edit"}
            value={formData.description}
            onChange={(e: any) => {
              handleInputChange(e.target.value, "description");
            }}
          ></textarea>
        </div>

        {/**ERROR MSG */}
        {submitMessage.length > 0 ? (
          <div className={`${form_style.form_group} ${form_style.error}`}>
            {submitMessage}
          </div>
        ) : null}

        {/**SUBMIT */}
        <div className={form_style.form_footer}>
          <button
            type="submit"
            className={button_styles.create_btn}
            data-testid="test-submit-form"
          >
            {t.saveButton}
          </button>
        </div>
      </form>
      {isTypeModalVisible ? (
        <MechanicsTypeModal
          isVisibe={isTypeModalVisible}
          setVisible={setTypeModalVisibe}
          setMechanicsType={setMechanicsType}
          currentType={formData.type_id}
        ></MechanicsTypeModal>
      ) : null}
    </>
  );
}
