import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import * as overviewStyles from "./OverviewGeneralInfo.module.scss";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "@components/Forms/GddForm/localisation/gddFormTranslator";

export default function OverviewGeneralInfo() {
  const { title, genre, platform, view } = useSelector(
    (state: RootState) => state.gddSlice.gdd
  );
  const currentLanguage = useCurrentLanguage();

  return (
    <div className={overviewStyles.overview_container} id="general-info">
      <h1 className={overviewStyles.overview_header}>{title}</h1>
      <section className={overviewStyles.game_info}>
        <div>
          <strong>{gddFormTranslator[currentLanguage].genre}: </strong> {genre}
        </div>
        <div>
          <strong>{gddFormTranslator[currentLanguage].platform}: </strong>
          {platform}
        </div>
        <div>
          <strong>{gddFormTranslator[currentLanguage].view}: </strong>
          {view}
        </div>
      </section>
    </div>
  );
}
