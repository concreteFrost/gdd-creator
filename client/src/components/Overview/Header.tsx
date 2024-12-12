import { RootState } from "@store/store";
import React from "react";
import { useSelector } from "react-redux";
import * as overviewStyles from "@styles/modules/overview.module.scss";

export default function Header() {
  const { title, genre, platform } = useSelector(
    (state: RootState) => state.gddSlice.gdd
  );
  return (
    <div className={overviewStyles.overview_container}>
      <h1 className={overviewStyles.overview_header}>{title}</h1>
      <section
        className={overviewStyles.overview_titles}
        style={{ flexDirection: "row", justifyContent: "space-around", gap: 0 }}
      >
        <span>
          <strong>Genre: </strong> {genre}
        </span>
        <span>
          <strong>Platform: </strong>
          {platform}
        </span>
      </section>
    </div>
  );
}
