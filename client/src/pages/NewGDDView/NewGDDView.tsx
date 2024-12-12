import React, { useEffect, useState } from "react";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import NewGDDForm from "@components/Forms/GddForm/NewGDDForm";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useNavigate } from "react-router-dom";

export default function NewGDDView() {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const { id } = useSelector((state: RootState) => state.gddSlice.gdd);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "") {
      navigate("/gdd/");
    }
  }, []);

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
