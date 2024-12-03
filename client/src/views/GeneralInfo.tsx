import GeneralInfoForm from "@components/Forms/GeneralInfoForm";
import Header from "@components/Overview/Header";
import OverviewGameplay from "@components/Overview/OverviewGameplay";
import OverviewMechanics from "@components/Overview/OverviewMechanics";
import MechanicsList from "@components/Tables/MechanicsList";
import React from "react";

function GeneralInfo() {
  return (
    <div>
      {/* <GeneralInfoForm></GeneralInfoForm> */}
      <Header></Header>
      <OverviewGameplay></OverviewGameplay>
      <OverviewMechanics></OverviewMechanics>
    </div>
  );
}

export default GeneralInfo;
