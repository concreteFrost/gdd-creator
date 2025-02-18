import * as form_style from "./CharacterForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import { NewCharacter } from "@_types/gddTypes";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import useClearOnTime from "@hooks/useClearOnTime";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import { useRef, useState } from "react";
import { handleUploadImage } from "@utils/images/handleUploadImage";
import LocationImage from "@components/Images/LocationImage";
import MechanicsTag from "@components/Tags/MechanicsTag";
import { CharacterFormFields } from "./localisation/characterFormTranslator";
import PressKeyHint from "@components/Hints/PressKeyHint";

interface CharacterFormProps {
  formData: NewCharacter;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<boolean>;
  t: CharacterFormFields;
}

export default function CharacterForm({
  formData,
  handleFormSubmit,
  setFormData,
  t,
}: CharacterFormProps) {
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const abilitiesInputRef: any = useRef<HTMLInputElement>(null);
  const traitsInputRef: any = useRef<HTMLInputElement>(null);

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  useKeyEnterWithInput({
    func: (e: any) => handleSetAbility(e),
    inputRef: abilitiesInputRef,
  });
  useKeyEnterWithInput({
    func: (e: any) => handleSetTrait(e),
    inputRef: traitsInputRef,
  });

  function handleSetAbility(e: any) {
    setFormData((prev: NewCharacter) => {
      if (prev.abilities.includes(e)) {
        return prev; // Если есть, просто возвращаем прежнее состояние
      }

      return {
        ...prev,
        abilities: [...prev.abilities, e],
      };
    });
  }

  function handleDeleteAbility(id: string) {
    const filtered = formData.abilities?.filter(
      (ability: string) => ability !== id
    );
    setFormData((prev: NewCharacter) => {
      return { ...prev, abilities: filtered };
    });
  }

  function handleSetTrait(e: any) {
    setFormData((prev: NewCharacter) => {
      if (prev.traits.includes(e)) {
        return prev; // Если есть, просто возвращаем прежнее состояние
      }

      return {
        ...prev,
        traits: [...prev.traits, e],
      };
    });
  }

  function handleDeleteTrait(id: string) {
    const filtered = formData.traits.filter((trait: string) => trait !== id);
    setFormData((prev: NewCharacter) => {
      return { ...prev, traits: filtered };
    });
  }

  const uploadMainImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const previewUrl = await handleUploadImage(e);
      console.log(e.target.files);
      setFormData((prev: NewCharacter) => {
        return {
          ...prev,
          img: previewUrl,
          imageInstance: e.target.files?.[0],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleMainImageDelete() {
    setFormData((prev: NewCharacter) => {
      return {
        ...prev,
        img: "",
        imageInstance: null,
      };
    });
  }

  function handleInputChange(value: any, key: keyof NewCharacter) {
    setFormData((prev: NewCharacter) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function submitForm(e: any) {
    const res = await handleFormSubmit(e);
    if (res === false) {
      setSubmitMessage(t.nameRequired);
      return;
    }
  }

  return (
    <>
      <form className={form_style.location_form} onSubmit={submitForm}>
        <div className={form_style.form_group} style={{ width: "100%" }}>
          <label htmlFor="title">{t.name}</label>
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
          <label htmlFor="environment">{t.role}</label>
          <input
            data-testid="test-role"
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={(e) => handleInputChange(e.target.value, "role")}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="backstory">{t.backstory}</label>
          <ReactQuill
            id="backstory"
            className=""
            value={formData.backstory}
            onChange={(e: any) => {
              handleInputChange(e, "backstory");
            }}
          ></ReactQuill>
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="abilities">{t.abilities}</label>
          <PressKeyHint></PressKeyHint>
          <input
            data-testid="test-abilities-input"
            type="text"
            style={{ marginBottom: 10 }}
            ref={abilitiesInputRef}
          ></input>
        </div>

        <div className={form_style.form_group}>
          {formData.abilities.length > 0 ? (
            <MechanicsTag
              deleteTag={(item: string) => handleDeleteAbility(item)}
              items={formData.abilities}
              renderItem={(item: string) => <>{item}</>}
            ></MechanicsTag>
          ) : null}
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="traits">{t.traits}</label>
          <PressKeyHint></PressKeyHint>
          <input
            data-testid="test-traits-input"
            type="text"
            style={{ marginBottom: 10 }}
            ref={traitsInputRef}
          ></input>
        </div>

        <div className={form_style.form_group}>
          {formData.traits.length > 0 ? (
            <MechanicsTag
              deleteTag={(item: string) => handleDeleteTrait(item)}
              items={formData.traits}
              renderItem={(item: string) => <>{item}</>}
            ></MechanicsTag>
          ) : null}
        </div>

        <div className={form_style.form_group} style={{ width: "100%" }}>
          <label htmlFor="main-image">{t.mainImage}</label>
          <input
            data-testid="test-main-image"
            type="file"
            id="main-image"
            name="title"
            accept="image/*"
            onChange={uploadMainImage}
          />
          {formData.img && (
            <div style={{ marginTop: "10px", position: "relative" }}>
              {/* <img
                src={formData.mainImage.path}
                alt="Main Image Preview"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                  border: "1px solid #ccc",
                }}
              /> */}
              <LocationImage
                path={formData.img}
                alt="Main image"
                width="200px"
              ></LocationImage>
              <button
                onClick={handleMainImageDelete}
                style={{
                  position: "absolute",
                  top: 5,
                  left: 175,
                }}
                type="button"
              >
                x
              </button>
            </div>
          )}
        </div>

        {/* <div className={form_style.form_group}>
          <label htmlFor="main-image">{t.additionalImages}</label>
          <input
            data-testid="test-main-image"
            type="file"
            id="main-image"
            name="title"
            onChange={uploadAdditionalImages}
          />
          <ul style={{ listStyle: "none", maxHeight: 200, overflowY: "auto" }}>
            {formData.additionalImages && formData.additionalImages.length > 0
              ? formData.additionalImages.map((image: GDDElementImage) => (
                <li
                  key={image.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <LocationImage
                    path={image.path}
                    alt="additional image"
                    width="150px"
                  ></LocationImage>
                  <button
                    onClick={() => deleteAdditionalImage(image.id)}
                    type="button"
                  >
                    x
                  </button>
                </li>
              ))
              : null}
          </ul>
        </div> */}

        {/* <div className={form_style.form_group}>
            <label htmlFor="description">Interactions</label>
          </div> */}

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
            {t.save}
          </button>
        </div>
      </form>
    </>
  );
}

// const uploadAdditionalImages = async (
//   e: React.ChangeEvent<HTMLInputElement>
// ) => {
//   try {
//     const previewUrl = await handleUploadImage(e);
//     const id = uuidv4();
//     const newImage: GDDElementImage = {
//       id: id,
//       path: previewUrl,
//     };
//     setFormData((prev: NewCharacter) => {
//       return {
//         ...prev,
//         additionalImages: [...prev.additionalImages!, newImage],
//       };
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// function deleteAdditionalImage(id: string) {
//   const filteredImages = formData.additionalImages?.filter(
//     (img: GDDElementImage) => img.id !== id
//   );

//   setFormData((prev: NewCharacter) => {
//     return {
//       ...prev,
//       additionalImages: filteredImages,
//     };
//   });
// }
