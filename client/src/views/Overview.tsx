import OverviewGeneralInfo from "@components/Overview/OverviewGeneralInfo/OverviewGeneralInfo";
import OverviewGameplay from "@components/Overview/OverviewGameplay/OverviewGameplay";
import OverviewMechanics from "@components/Overview/OverviewMechanics/OverviewMechanics";
import OverviewLocations from "@components/Overview/OverviewLocations/OverviewLocations";
import OverviewCharacters from "@components/Overview/OverviewCharacters/OverviewCharacters";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "@styles/print.css"; // Подключение печатных стилей

function GeneralInfo() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <button onClick={() => reactToPrintFn()}>Generate PDF</button>
      <div id="gdd-content" ref={contentRef}>
        <div id="general-info">
          <OverviewGeneralInfo />
        </div>
        <div id="gameplay">
          <OverviewGameplay />
        </div>
        <div id="mechanics">
          <OverviewMechanics />
        </div>
        <div id="locations">
          <OverviewLocations />
        </div>
        <div id="characters">
          <OverviewCharacters />
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
