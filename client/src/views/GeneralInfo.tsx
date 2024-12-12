import GeneralInfoForm from "@components/Forms/GddForm/GeneralInfoForm";
import Header from "@components/Overview/Header";
import OverviewGameplay from "@components/Overview/OverviewGameplay";
import OverviewLocations from "@components/Overview/OverviewLocations/OverviewLocations";
import OverviewMechanics from "@components/Overview/OverviewMechanics/OverviewMechanics";
import MechanicsList from "@components/Tables/MechanicsList";
import React from "react";

function GeneralInfo() {
  return (
    <div>
      {/* <GeneralInfoForm></GeneralInfoForm> */}
      <Header></Header>
      <OverviewGameplay></OverviewGameplay>
      <OverviewLocations></OverviewLocations>
      <OverviewMechanics></OverviewMechanics>
    </div>
  );
}

export default GeneralInfo;
