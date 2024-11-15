import React, { useState } from "react";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import * as s from "./NewGDDView.modal.scss";
import NewGDDForm from "@components/Forms/NewGDDForm";

export default function NewGDDView() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const showNewGDDModal = () => setModalIsOpen(true);

  return (
    <div>
      <NewGDDForm
        modalIsOpen={modalIsOpen}
        setModalisOpen={setModalIsOpen}
      ></NewGDDForm>
      <CreateButton action={showNewGDDModal} title="CREATE"></CreateButton>
    </div>
  );
}
