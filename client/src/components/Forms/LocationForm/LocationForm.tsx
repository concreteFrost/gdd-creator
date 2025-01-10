import * as form_style from "./LocationForm.module.scss";
import * as button_styles from "@components/Buttons/Button.module.scss";
import {
  Character,
  GameLocation,
  GDDElementImage,
  NewGameLocation,
} from "@_types/gddTypes";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import useClearOnTime from "@hooks/useClearOnTime";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { handleUploadImage } from "@utils/images/handleUploadImage";
import LocationImage from "@components/Images/LocationImage";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { LocationFormElements } from "./localisation/locationFormTranslator";

interface LocationFormProps {
  formData: NewGameLocation;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => boolean;
  language: LocationFormElements;
}

export default function LocationForm({
  formData,
  handleFormSubmit,
  setFormData,
  language
}: LocationFormProps) {
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const { characters } = useSelector((state: RootState) => state.charactersSlice);

  useClearOnTime({ setText: setSubmitMessage, text: submitMessage });
  //   useKeyEnterWithInput({
  //     func: (e: any) => handleSetExample(e),
  //     inputRef: inputRef,
  //   });

  const uploadMainImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const previewUrl = await handleUploadImage(e);
      const id = uuidv4();
      setFormData((prev: GameLocation) => {
        return {
          ...prev,
          mainImage: {
            id: id,
            path: previewUrl,
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleMainImageDelete() {
    setFormData((prev: NewGameLocation) => {
      return {
        ...prev,
        mainImage: {
          id: "",
          path: "",
        },
      };
    });
  }

  const uploadAdditionalImages = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const previewUrl = await handleUploadImage(e);
      const id = uuidv4();
      const newImage: GDDElementImage = {
        id: id,
        path: previewUrl,
      };
      setFormData((prev: GameLocation) => {
        return {
          ...prev,
          additionalImages: [...prev.additionalImages!, newImage],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  function deleteAdditionalImage(id: string) {
    const filteredImages = formData.additionalImages?.filter(
      (img: GDDElementImage) => img.id !== id
    );

    setFormData((prev: GameLocation) => {
      return {
        ...prev,
        additionalImages: filteredImages,
      };
    });
  }

  function handleInputChange(value: any, key: keyof NewGameLocation) {
    setFormData((prev: NewGameLocation) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function submitForm(e: any) {
    if (handleFormSubmit(e) === false) {
      setSubmitMessage(language.nameRequired);
      return;
    }
  }

  function toggleCharacters(e: any, character: Character) {
    const isChecked = e.target.checked;
    const updatedCharacters = isChecked
      ? [...(formData.characters || []), character.id]
      : (formData.characters || []).filter((id) => id !== character.id);

    setFormData((prev: NewGameLocation) => ({
      ...prev,
      characters: updatedCharacters,
    }));
  }

  return (
    <>
      <form className={form_style.location_form} onSubmit={submitForm}>
        {/*Name */}
        <section className={form_style.form_group}>
          <label htmlFor="title">{language.name}*</label>
          <input
            data-testid="test-title"
            type="text"
            id="title"
            name="title"
            value={formData.name}
            onChange={(e) => handleInputChange(e.target.value, "name")}
          />
        </section>
        {/*Environment */}
        <section className={form_style.form_group}>
          <label htmlFor="environment">{language.environment}*</label>
          <input
            data-testid="test-environment"
            type="text"
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={(e) => handleInputChange(e.target.value, "environment")}
          />
        </section>
        {/*Description */}
        <section className={form_style.form_group}>
          <label htmlFor="description">{language.description}</label>
          <ReactQuill
            id="description"
            className=""
            value={formData.description}
            onChange={(e: any) => {
              handleInputChange(e, "description");
            }}
          ></ReactQuill>
        </section>
        {/*Characters */}
        <section className={form_style.form_group}>
          <label>{language.characters}</label>
          <ul className={form_style.characters_list}>
            {characters.length > 0 ? characters.map((character: Character) => (
              <li key={character.id}>
                <span>{character.name}</span>
                <div className={form_style.input}><input
                  type="checkbox"
                  value={character.id}
                  checked={formData.characters?.includes(character.id) || false}
                  onChange={(e) => toggleCharacters(e, character)}
                /></div>

              </li>
            )) : null}
          </ul>
        </section>

        {/*Main image */}
        <section className={form_style.form_group}>
          <label htmlFor="main-image">{language.mainImage}</label>
          <input
            data-testid="test-main-image"
            type="file"
            id="main-image"
            name="title"
            accept="image/*"
            onChange={uploadMainImage}
          />
          {formData.mainImage?.path && (
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
                path={formData.mainImage.path}
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
        </section>
        {/*Additional images */}
        <section className={form_style.form_group}>
          <label htmlFor="main-image">{language.additionalImages}</label>
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
        </section>
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
            {language.save}
          </button>
        </div>
      </form>
    </>
  );
}
