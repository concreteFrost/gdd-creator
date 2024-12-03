import React, { memo } from "react";
import {
  GroupedMechanics,
  GameMechanic,
  MechanicExample,
} from "@_types/gddTypes";
import * as overviewStyles from "@styles/modules/overview.module.scss";
import "@styles/overrides/quill_override.scss";
import ReactQuill from "react-quill-new";
import { formatQuillOutput } from "@utils/quillToText";
import * as tagStyles from "@styles/modules/tags.module.scss";

interface MechanicsDescriptionProps {
  group: GroupedMechanics;
}

function OverviewMechanicsElement({ group }: MechanicsDescriptionProps) {
  if (group.mechanics.length === 0) return null;

  return (
    <div>
      {group.mechanics.map((mechanic) => (
        <div key={mechanic.id}>
          <div className={overviewStyles.mechanics_example}>
            <section
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "10px",
              }}
            >
              <span>
                <strong>Name:</strong>
              </span>
              <span>{mechanic.name}</span>
            </section>
            <section
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "10px",
              }}
            >
              <span>
                <strong>Type:</strong>
              </span>
              <span>{group.type.type}</span>
            </section>
            <section
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "10px",
              }}
            >
              <span>
                <strong>Description:</strong>
              </span>
              {formatQuillOutput(mechanic.description)}
            </section>
            <section>
              <span>
                <strong>Examples:</strong>
              </span>
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
            </section>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(OverviewMechanicsElement);
