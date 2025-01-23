import * as overviewStyles from "./OverviewCharacters.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { Character, GameLocation } from "@_types/gddTypes";
import OverviewCharactersElement from "./OverviewCharactersElement";
import { sidebarTranslator } from "@components/Sidebar/localisation/sidebarTranslator";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { locationsFormTranslator } from "@components/Forms/LocationForm/localisation/locationFormTranslator";
import { characterFormTranslator } from "@components/Forms/CharacterForm/localisation/characterFormTranslator";

export default function OverviewCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersSlice
  );

  if (characters.length === 0) return;

  const currentLang = useCurrentLanguage();
  const headerName = sidebarTranslator[currentLang].locations;
  const t = characterFormTranslator[currentLang];

  return (
    <div className={overviewStyles.overview_container}>
      <h2 className={overviewStyles.overview_header}>{headerName}</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {characters.map((character: Character) => (
          <li key={character.id} className={overviewStyles.character_item}>
            <OverviewCharactersElement
              t={t}
              character={character}
            ></OverviewCharactersElement>
          </li>
        ))}
      </ul>
    </div>
  );
}
