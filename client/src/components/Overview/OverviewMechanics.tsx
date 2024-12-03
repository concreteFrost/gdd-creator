import React from "react";
import * as overviewStyles from "@styles/modules/overview.module.scss";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill-new";
import { RootState } from "@store/store";
import { useMemo } from "react";
import {
  groupdMechanics,
  unsortedMechanics,
} from "@utils/mechanics/groupMechanicsByType";
import { GroupedMechanics } from "@_types/gddTypes";
import OverviewMechanicsElement from "./OverviewMechanicsElement";

export default function OverviewMechanics() {
  const { mechanics } = useSelector((state: RootState) => state.mechanicsSlice);
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);

  const groupedMechanics = useMemo(
    () => groupdMechanics(types, mechanics),
    [types, mechanics]
  );
  // Сгруппировать механики, у которых нет типа (например, typeId === "unknown" или не определен)
  const mechanicsWithoutType = useMemo(
    () => unsortedMechanics(mechanics),
    [mechanics]
  );

  // Добавляем механики без типа в отдельную группу
  if (mechanicsWithoutType.length > 0) {
    groupedMechanics.push({
      type: { id: "unknown", type: "unspecified" },
      mechanics: mechanicsWithoutType,
    });
  }

  return (
    <div className={overviewStyles.overview_container}>
      <h2 className={overviewStyles.overview_header}>Mechanics</h2>
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {groupedMechanics.length > 0 ? (
          groupedMechanics.map((gr: GroupedMechanics) => (
            <li key={gr.type.id}>
              <OverviewMechanicsElement group={gr}></OverviewMechanicsElement>
            </li>
          ))
        ) : (
          <span>Currently this list is empty</span>
        )}
      </ul>
    </div>
  );
}
