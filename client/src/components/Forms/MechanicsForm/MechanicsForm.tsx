import * as form_style from "./MechanicsForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { GameMechanic, MechanicType, MechanicExample } from "@_types/gddTypes";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "@styles/overrides/quill_override.scss";
import { useSelector } from "react-redux";
import useClearOnTime from "@hooks/useClearOnTime";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import { RootState } from "@store/store";
import { useRef, useState } from "react";
import MechanicsTag from "@components/Tags/MechanicsTag";
import { v4 as uuidv4 } from "uuid";
import MechanicsTypeModal from "@components/Modal/MechanicsTypeModal";
import { MechanicFormElements } from "./localisation/mechanicsFormTranslator";
import PressKeyHint from "@components/Hints/PressKeyHint";

export type NewMechnicForm = Omit<GameMechanic, "id" | "gddId">;

interface MechanicsFormProps {
  formData: NewMechnicForm;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => boolean;
  language: MechanicFormElements;
}

export default function MechanicsForm({
  formData,
  handleFormSubmit,
  setFormData,
  language: t
}: MechanicsFormProps) {

  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);
  const inputRef: any = useRef<HTMLInputElement>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [isTypeModalVisible, setTypeModalVisibe] = useState<boolean>(false);

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  useKeyEnterWithInput({
    func: (e: any) => handleSetExample(e),
    inputRef: inputRef,
  });

  function setMechanicsType(value: string) {
    handleInputChange(value, "typeId");
  }

  function handleSetExample(e: any) {
    const newExample = { id: uuidv4(), example: e };
    setFormData((prev: NewMechnicForm) => {
      return {
        ...prev,
        examples: [...prev.examples, newExample],
      };
    });
  }

  function handleDeleteExample(id: string) {
    const filtered = formData.examples.filter(
      (ex: MechanicExample) => ex.id !== id
    );
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

  function submitForm(e: any) {
    if (handleFormSubmit(e) === false) {
      setSubmitMessage(t.requiredError);
      return;
    }
  }

  return (
    <>
      <form className={form_style.mechanic_form} onSubmit={submitForm}>
        <div style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 20 }}>
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
                value={formData.typeId}
                onChange={(e: any) => {
                  handleInputChange(e.target.value, "typeId");
                }}
              >
                <option value={"unspecified"}>
                  {t.selectTypePlaceholder}
                </option>
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

        <div className={form_style.form_group}>
          <label htmlFor="description" className={form_style.relative_label}>{t.examplesLabel}</label>
          <PressKeyHint></PressKeyHint>
          <input
            data-testid="test-example-input"
            type="text"
            style={{ marginBottom: 10 }}
            ref={inputRef}
          ></input>
        </div>

        <div className={form_style.form_group}>
          {formData.examples.length > 0 ? (
            <MechanicsTag
              deleteTag={(item: MechanicExample) =>
                handleDeleteExample(item.id)
              }
              items={formData.examples}
              renderItem={(item: MechanicExample) => <>{item.example}</>}
            ></MechanicsTag>
          ) : null}
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="description">{t.descriptionLabel}</label>
          {/* <textarea name="description" id="description"
          value={formData.description}
         rows={5}
         cols={30}
          onChange={(e:any)=>handleInputChange(e.target.value,"description")}></textarea> */}
          <ReactQuill
            id="description"
            className={"edit"}
            value={formData.description}
            onChange={(e: any) => {
              handleInputChange(e, "description");
            }}
          ></ReactQuill>
        </div>

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
            {t.saveButton}
          </button>
        </div>
      </form>
      {isTypeModalVisible ? (
        <MechanicsTypeModal
          isVisibe={isTypeModalVisible}
          setVisible={setTypeModalVisibe}
          setMechanicsType={setMechanicsType}
          currentType={formData.typeId}
        ></MechanicsTypeModal>
      ) : null}
    </>
  );
}
