import React, { useState } from "react";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import NewGDDForm from "@components/Forms/NewGDDForm";

export default function NewGDDView() {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  function setVisible() {
    setFormVisible(true);
  }

  return (
    <div>
      <NewGDDForm
        isVisible={isFormVisible}
        setVisible={setFormVisible}
      ></NewGDDForm>
      <CreateButton action={setVisible} title="CREATE"></CreateButton>
    </div>
  );
}
