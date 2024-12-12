import React from "react";
import * as overviewStyles from "@styles/modules/overview.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { GameLocation } from "@_types/gddTypes";
import OverviewLocationsElement from "./OverviewLocationsElement";

export default function OverviewLocations() {
  const { locations } = useSelector((state: RootState) => state.locationsSlice);

  if (locations.length === 0) return;

  return (
    <div className={overviewStyles.overview_container}>
      <h2 className={overviewStyles.overview_header}>Locations</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {locations.map((location: GameLocation) => (
          <li key={location.id}>
            <OverviewLocationsElement
              location={location}
            ></OverviewLocationsElement>
          </li>
        ))}
      </ul>
    </div>
  );
}
