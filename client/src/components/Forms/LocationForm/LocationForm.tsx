import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import {
  GameLocation,
  GameLocationImage,
  NewGameLocation,
} from "@_types/gddTypes";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import useClearOnTime from "@hooks/useClearOnTime";
import { useKeyEnterWithInput } from "@hooks/useKeyEnter";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { handleUploadImage } from "@utils/images/handleUploadImage";
import LocationImage from "@components/Images/LocationImage";

interface LocationFormProps {
  formData: NewGameLocation;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => boolean;
}

export default function LocationForm({
  formData,
  handleFormSubmit,
  setFormData,
}: LocationFormProps) {
  const [submitMessage, setSubmitMessage] = useState<string>("");

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
      const newImage: GameLocationImage = {
        id: id,
        path: previewUrl,
      };
      setFormData((prev: GameLocation) => {
        return {
          ...prev,
          additionalImages: [...prev.additionalImages, newImage],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  function deleteAdditionalImage(id: string) {
    const filteredImages = formData.additionalImages.filter(
      (img: GameLocationImage) => img.id !== id
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
      setSubmitMessage("Name is required");
      return;
    }
  }

  return (
    <>
      <form className={form_style.mechanic_form} onSubmit={submitForm}>
        <div className={form_style.form_group} style={{ width: "100%" }}>
          <label htmlFor="title">Name*</label>
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
          <label htmlFor="environment">Environment*</label>
          <input
            data-testid="test-environment"
            type="text"
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={(e) => handleInputChange(e.target.value, "environment")}
          />
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="description">Description</label>
          <ReactQuill
            id="description"
            className=""
            value={formData.description}
            onChange={(e: any) => {
              handleInputChange(e, "description");
            }}
          ></ReactQuill>
        </div>

        <div className={form_style.form_group} style={{ width: "100%" }}>
          <label htmlFor="main-image">Main Image</label>
          <input
            data-testid="test-main-image"
            type="file"
            id="main-image"
            name="title"
            accept="image/*"
            onChange={uploadMainImage}
          />
          {formData.mainImage.path && (
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
        </div>

        <div className={form_style.form_group}>
          <label htmlFor="main-image">Additional Images</label>
          <input
            data-testid="test-main-image"
            type="file"
            id="main-image"
            name="title"
            onChange={uploadAdditionalImages}
          />
          <ul style={{ listStyle: "none", maxHeight: 200, overflowY: "auto" }}>
            {formData.additionalImages.length > 0
              ? formData.additionalImages.map((image: GameLocationImage) => (
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
          <button
            type="submit"
            className={button_styles.create_btn}
            data-testid="test-submit-form"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
