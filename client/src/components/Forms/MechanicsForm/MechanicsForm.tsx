import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { GameMechanic, MechanicType, MechanicExample } from "@_types/gddTypes";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { addMechanicType } from "@store/slices/mechanicsSlice";
import useClearOnTime from "@hooks/useClearOnTime";
import useKeyEnter from "@hooks/useKeyEnter";
import { RootState } from "@store/store";
import { useRef, useState } from "react";
import MechanicsTag from "@components/Tags/MechanicsTag";
import { v4 as uuidv4 } from "uuid";

type NewMechnicForm = Omit<GameMechanic, "id" | "gddId">;

interface MechanicsFormProps {
  initialState: NewMechnicForm;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function MechanicsForm({
  initialState,
  handleFormSubmit,
}: MechanicsFormProps) {
  const [formData, setFormData] = useState<NewMechnicForm>(initialState);
  const { types } = useSelector((state: RootState) => state.mechanicsSlice);
  const inputRef: any = useRef<HTMLInputElement>(null);
  const newTypeRef: any = useRef<HTMLInputElement>(null);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const dispatch = useDispatch();

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  useKeyEnter({ func: (e: any) => handleSetExample(e), inputRef: inputRef });
  useKeyEnter({ func: (e: any) => handleAddType(e), inputRef: newTypeRef });

  function handleInputChange(value: any, key: keyof NewMechnicForm) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleSetExample(e: any) {
    const newExample: MechanicExample = {
      id: uuidv4(),
      example: e,
    };
    setFormData((prev) => {
      return {
        ...prev,
        examples: [...prev.examples, newExample],
      };
    });
  }

  function handleAddType(e: any) {
    const newType: MechanicType = {
      id: uuidv4(),
      type: e,
    };
    dispatch(addMechanicType(newType));
    handleInputChange(newType, "typeId");
  }

  return (
    <form className={form_style.general_info_form} onSubmit={handleFormSubmit}>
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

      <div className={form_style.form_group}>
        <label htmlFor="description">Type</label>
        {types.length > 0 ? (
          <select value={formData.typeId} onChange={() => {}}>
            {types.map((type: MechanicType) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        ) : null}

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label htmlFor="new_type">Add Type</label>
          <input
            placeholder="new"
            id="new_type"
            name="new_type"
            type="text"
            style={{ width: "300px" }}
            ref={newTypeRef}
          ></input>
        </div>
      </div>

      <div className={form_style.form_group}>
        <label htmlFor="description">Examples</label>
        <input type="text" style={{ marginBottom: 10 }} ref={inputRef}></input>
      </div>

      <div className={form_style.form_group}>
        {formData.examples.length > 0 ? (
          <MechanicsTag
            items={formData.examples}
            renderItem={(item: MechanicExample) => <>{item.example}</>}
          ></MechanicsTag>
        ) : null}
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
  );
}
