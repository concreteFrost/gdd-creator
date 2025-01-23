import React, { useEffect, useState } from "react";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import NewGDDForm from "@components/Forms/GddForm/NewGDDForm";
import ExistingGDDsList from "@components/Lists/ExistingGDDsList/ExistingGDDsList";
import { dashboardTranslator } from "./localisation/dashboardLocalisation";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";

export default function Dashboard() {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const currentLanguage = useCurrentLanguage();
  const loc = dashboardTranslator[currentLanguage];

  function setVisible() {
    setFormVisible(true);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ExistingGDDsList></ExistingGDDsList>
        <CreateButton
          action={setVisible}
          title={loc.createButton}
        ></CreateButton>
      </div>

      <NewGDDForm
        isVisible={isFormVisible}
        setVisible={setFormVisible}
      ></NewGDDForm>
    </div>
  );
}
