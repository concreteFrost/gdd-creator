import { Character, GameLocation } from "@_types/gddTypes";
import "@styles/overrides/quill_override.scss";
import { formatQuillOutput } from "@utils/quillToText";
import LocationImage from "@components/Images/LocationImage";
import * as overviewStyles from "./OverviewLocations.module.scss";
import { LocationFormElements } from "@components/Forms/LocationForm/localisation/locationFormTranslator";

interface LocationElementProps {
  location: GameLocation;
  characters:Character[];
  t: LocationFormElements;
}

function OverviewMechanicsElement({ location, characters, t }: LocationElementProps) {

  const locationCharacters = characters.filter((character:Character)=>location.characters.find((id:string)=> id === character.id));
  return (
    <div>
      <section className={overviewStyles.sub_header}>
        <h2>{location.name}</h2>
        {location.mainImage?.path ? <LocationImage
          path={location.mainImage ? location.mainImage.path : ""}
          alt={"main image"}
          width="700px"
        ></LocationImage> : null}
      </section>
      <section className={overviewStyles.paragraphs_container}>
          <div className={overviewStyles.paragraph_element}>
            <header className={overviewStyles.paragraph_header}>{t.environment}: </header>
            {location.environment}
          </div>      
          <div className={overviewStyles.paragraph_element}>
            <header className={overviewStyles.paragraph_header}>{t.description}: </header>
            <div className={overviewStyles.formatted_text}>
              {formatQuillOutput(location.description)}
            </div>
          </div>
          <div className={overviewStyles.paragraph_element}>
            <header className={overviewStyles.paragraph_header}>{t.characters}: </header>
            <ul>
              {locationCharacters.length > 0 ? locationCharacters.map((character:Character)=><li key={character?.id}>{character?.name}</li>) : <span>-</span>}
            </ul>
          </div>
        </section>
       
    </div>
  );
}

export default OverviewMechanicsElement;
