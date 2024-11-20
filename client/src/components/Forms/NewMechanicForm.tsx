import { RootState } from "@store/store";
import * as form_style from "@styles/modules/form.module.scss";
import * as button_styles from "@styles/modules/button.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameMechanic, MechanicExample, MechanicType } from "@_types/gddTypes";
import useClearOnTime from "@hooks/useClearOnTime";
import { useEffect, useState, useRef } from "react";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as tag_style from "@styles/modules/tags.module.scss";
import { v4 as uuidv4 } from "uuid";
import MechanicsTag from "@components/Tags/MechanicsTag";
import useKeyEnter from "@hooks/useKeyEnter";
import MechanicsForm from "./MechanicsForm/MechanicsForm";

type NewMechnicForm = Omit<GameMechanic, "id" | "gddId">;

const initialState: NewMechnicForm = {
  name: "",
  description: "",
  typeId: "",
  interactions: [],
  examples: [],
};

function NewMechanicForm() {
  const dispatch = useDispatch();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(showModal({ activeModal: ActiveModal.Info, text: "Success" }));
  }

  return (
    <MechanicsForm
      initialState={initialState}
      handleFormSubmit={handleFormSubmit}
    ></MechanicsForm>
  );
}

export default NewMechanicForm;
