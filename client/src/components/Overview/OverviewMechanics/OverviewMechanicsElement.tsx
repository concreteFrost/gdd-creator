import { memo } from "react";
import { GroupedMechanics, MechanicExample } from "@_types/gddTypes";
import * as overviewStyles from "@styles/modules/overview.module.scss";
import * as tagStyles from "@styles/modules/tags.module.scss";
import * as formattedTextStyles from "@styles/modules/text.module.scss";
import "@styles/overrides/quill_override.scss";
import { formatQuillOutput } from "@utils/quillToText";

interface MechanicsDescriptionProps {
  group: GroupedMechanics;
}

function OverviewMechanicsElement({ group }: MechanicsDescriptionProps) {
  if (group.mechanics.length === 0) return null;

  return (
    <div>
      {group.mechanics.map((mechanic) => (
        <div key={mechanic.id} className={overviewStyles.mechanics_example}>
          <section className={overviewStyles.overview_titles}>
            <span>
              <strong>Name: </strong>
              {mechanic.name}
            </span>
            <span>
              <strong>Description: </strong>
              <div className={formattedTextStyles.formatted_text}>
                {formatQuillOutput(mechanic.description)}
              </div>
            </span>
          </section>

          <section className={overviewStyles.overview_titles}>
            <span>
              <strong>Examples:</strong>
            </span>
          </section>
          <div
            className={tagStyles.examples_container}
            style={{ border: "none" }}
          >
            <ul>
              {mechanic.examples.map((example: MechanicExample) => (
                <li key={example.id}>{example.example}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(OverviewMechanicsElement);
