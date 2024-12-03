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
      <div className={overviewStyles.overview_section}>
        <h1 className={overviewStyles.overview_header}>Game Title: {title}</h1>
        <p className={overviewStyles.overview_paragraph}>Genre: {genre}</p>
        <p className={overviewStyles.overview_paragraph}>
          Platform: {platform}
        </p>
      </div>
    </div>
  );
}
