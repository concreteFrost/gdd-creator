import { GameLocation } from "@_types/gddTypes";
import "@styles/overrides/quill_override.scss";
import { formatQuillOutput } from "@utils/quillToText";
import LocationImage from "@components/Images/LocationImage";
import * as formattedTextStyles from "@styles/modules/text.module.scss";
import * as overviewStyles from "@styles/modules/overview.module.scss";

interface LocationElementProps {
  location: GameLocation;
}

function OverviewMechanicsElement({ location }: LocationElementProps) {
  return (
    <div>
      <section className={overviewStyles.location_title}>
        <h2>{location.name}</h2>
        <LocationImage
          path={location.mainImage.path}
          alt={"main image"}
          width="700px"
        ></LocationImage>
      </section>
      <div className={overviewStyles.mechanics_example}>
        <section className={overviewStyles.overview_titles}>
          <span>
            <strong>Environment: </strong>
            <br></br>
            {location.environment}
          </span>
          <span>
            <strong>Description: </strong>
            <div className={formattedTextStyles.formatted_text}>
              {formatQuillOutput(location.description)}
            </div>
          </span>
        </section>
      </div>
    </div>
  );
}

export default OverviewMechanicsElement;
