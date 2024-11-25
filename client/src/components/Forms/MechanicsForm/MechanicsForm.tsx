import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { GameMechanic, MechanicType, MechanicExample } from "@_types/gddTypes";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import useClearOnTime from "@hooks/useClearOnTime";
import useKeyEnter from "@hooks/useKeyEnter";
import { RootState } from "@store/store";
import { useRef, useState } from "react";
import MechanicsTag from "@components/Tags/MechanicsTag";
import { v4 as uuidv4 } from "uuid";
import MechanicsTypeModal from "@components/Modal/MechanicsTypeModal";

export type NewMechnicForm = Omit<GameMechanic, "id" | "gddId">;

interface MechanicsFormProps {
  formData: NewMechnicForm;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => boolean;
}

export default function MechanicsForm({
  formData,
  handleFormSubmit,
  setFormData,
}: MechanicsFormProps) {
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);
  const inputRef: any = useRef<HTMLInputElement>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [isTypeModalVisible, setTypeModalVisibe] = useState<boolean>(false);

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  useKeyEnter({ func: (e: any) => handleSetExample(e), inputRef: inputRef });

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
      setSubmitMessage("Name and Type are required");
      return;
    }
  }

  return (
    <>
      <form className={form_style.general_info_form} onSubmit={submitForm}>
        <div className={form_style.form_group}>
          <label htmlFor="title">Name*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.name}
            onChange={(e) => handleInputChange(e.target.value, "name")}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="description">Type*</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 7fr",
              gap: 10,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {types.length > 0 ? (
              <select
                value={formData.typeId}
                onChange={(e: any) => {
                  handleInputChange(e.target.value, "typeId");
                }}
              >
                <option value={"undefined"} disabled>
                  Select Type
                </option>
                {types.map((type: MechanicType) => (
                  <option key={type.id} value={type.id}>
                    {type.type}
                  </option>
                ))}
              </select>
            ) : null}

            <button
              className={button_styles.create_btn}
              style={{ width: "150px" }}
              type="button"
              onClick={() => setTypeModalVisibe(true)}
            >
              EDIT TYPES
            </button>
          </div>
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="description">Examples</label>
          <input
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
          <label htmlFor="description">Description</label>
          <ReactQuill
            className={form_style.some_class}
            id="description"
            value={formData.description}
            onChange={(e: any) => {
              handleInputChange(e, "description");
            }}
          ></ReactQuill>
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
          <button type="submit" className={button_styles.create_btn}>
            Save
          </button>
        </div>
      </form>
      {isTypeModalVisible ? (
        <MechanicsTypeModal
          isVisibe={isTypeModalVisible}
          setVisible={setTypeModalVisibe}
          setMechanicsType={setMechanicsType}
        ></MechanicsTypeModal>
      ) : null}
    </>
  );
}
