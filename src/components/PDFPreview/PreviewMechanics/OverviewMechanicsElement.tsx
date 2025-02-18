import { memo } from "react";
import { GroupedMechanics, MechanicExample } from "@_types/gddTypes";
import * as overviewStyles from "./OverviewMechanics.module.scss";
import "@styles/overrides/quill_override.scss";
import { formatQuillOutput } from "@utils/quillToText";
import { MechanicFormElements } from "@components/Forms/MechanicsForm/localisation/mechanicsFormTranslator";
import { v4 as uuidv4 } from "uuid";

interface MechanicsDescriptionProps {
  group: GroupedMechanics;
  t: MechanicFormElements;
}

function OverviewMechanicsElement({ group, t }: MechanicsDescriptionProps) {
  if (group.mechanics.length === 0) return null;

  return (
    <>
      {group.mechanics.map((mechanic) => (
        <div>
          <div className={overviewStyles.mechanic_title}>
            <header className={overviewStyles.paragraph_header}>
              {mechanic.name}
            </header>
          </div>
          <section
            key={uuidv4()}
            className={overviewStyles.paragraphs_container}
          >
            <div className={overviewStyles.paragraph_element}>
              <header className={overviewStyles.paragraph_header}>
                {t.descriptionLabel}:{" "}
              </header>
              <div className={overviewStyles.formatted_text}>
                {formatQuillOutput(mechanic.description)}
              </div>
            </div>
            <div className={overviewStyles.paragraph_element}>
              <header className={overviewStyles.paragraph_header}>
                {t.typeLabel.split("*")[0]}:{" "}
              </header>
              <div className={overviewStyles.formatted_text}>
                {group.type.type}
              </div>
            </div>
            <div className={overviewStyles.paragraph_element}>
              <header className={overviewStyles.paragraph_header}>
                {t.examplesLabel}:{" "}
              </header>
              <div className={overviewStyles.formatted_text}>
                <ul>
                  {mechanic.examples.map((example: string) => (
                    <li key={uuidv4()}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}

export default memo(OverviewMechanicsElement);
