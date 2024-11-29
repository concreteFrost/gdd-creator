import GeneralInfoForm from "@components/Forms/GeneralInfoForm";
import React from "react";

function GeneralInfo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "12fr",
        padding: 0,
        margin: 0,
      }}
    >
      <GeneralInfoForm></GeneralInfoForm>
    </div>
  );
}

export default GeneralInfo;
