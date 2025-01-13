import * as overviewStyles from "./OverviewLocations.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { GameLocation } from "@_types/gddTypes";
import OverviewLocationsElement from "./OverviewLocationsElement";
import { sidebarTranslator } from "@components/Sidebar/localisation/sidebarTranslator";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { locationsFormTranslator } from "@components/Forms/LocationForm/localisation/locationFormTranslator";

export default function OverviewLocations() {
  const { locations } = useSelector((state: RootState) => state.locationsSlice);
  const { characters } = useSelector(
    (state: RootState) => state.charactersSlice
  );

  if (locations.length === 0) return;

  const currentLang = useCurrentLanguage();
  const headerName = sidebarTranslator[currentLang].locations;
  const t = locationsFormTranslator[currentLang];

  return (
    <div className={overviewStyles.overview_container} id="locations">
      <h2 className={overviewStyles.overview_header}>{headerName}</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {locations.map((location: GameLocation) => (
          <li key={location.id} className={overviewStyles.location_item}>
            <OverviewLocationsElement
              t={t}
              location={location}
              characters={characters}
            ></OverviewLocationsElement>
          </li>
        ))}
      </ul>
    </div>
  );
}
