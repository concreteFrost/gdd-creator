import { Character, CharacterAbilities, CharacterTraits } from "@_types/gddTypes";
import { formatQuillOutput } from "@utils/quillToText";
import LocationImage from "@components/Images/LocationImage";
import * as overviewStyles from "./OverviewCharacters.module.scss";
import { CharacterFormFields } from "@components/Forms/CharacterForm/localisation/characterFormTranslator";

interface LocationElementProps {
  character: Character;
  t: CharacterFormFields;
}

function OverviewCharactersElement({ character, t }: LocationElementProps) {

  return (
    <div>
      <section className={overviewStyles.sub_header}>
        {/**name */}
        <h2>{character.name}</h2>
        {character.mainImage?.path ? <LocationImage
          path={character.mainImage ? character.mainImage.path : ""}
          alt={"main image"}
          width="200px"
        ></LocationImage> : null}
      </section>
      <section className={overviewStyles.paragraphs_container}>
        {/**role */}
        <div className={overviewStyles.paragraph_element}>
          <header className={overviewStyles.paragraph_header}>{t.role}: </header>
          {character.role}
        </div>
        {/**backstory */}
        <div className={overviewStyles.paragraph_element}>
          <header className={overviewStyles.paragraph_header}>{t.backstory}: </header>
          <div className={overviewStyles.formatted_text}>
            {formatQuillOutput(character.backstory)}
          </div>
        </div>
        {/**abilities */}
        <div className={overviewStyles.paragraph_element}>
          <header className={overviewStyles.paragraph_header}>{t.abilities}: </header>
          <ul>
            {character.abilities.length > 0 ? character.abilities.map((abilities: CharacterAbilities) => <li key={abilities.id}>{abilities.ability}</li>) : <span>-</span>}
          </ul>
        </div>
        {/**traits */}
        <div className={overviewStyles.paragraph_element}>
          <header className={overviewStyles.paragraph_header}>{t.traits}: </header>
          <ul>
            {character.traits.length > 0 ? character.traits.map((trait: CharacterTraits) => <li key={trait.id}>{trait.trait}</li>) : <span>-</span>}
          </ul>
        </div>
      </section>

    </div>
  );
}

export default OverviewCharactersElement;
