import * as overviewStyles from "./OverviewMechanics.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import {
  groupdMechanics,
  unsortedMechanics,
} from "@utils/mechanics/groupMechanicsByType";
import { GroupedMechanics } from "@_types/gddTypes";
import OverviewMechanicsElement from "./OverviewMechanicsElement";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { sidebarTranslator } from "@components/Sidebar/localisation/sidebarTranslator";
import { mechanicsFormTranslator } from "@components/Forms/MechanicsForm/localisation/mechanicsFormTranslator";

export default function OverviewMechanics() {
  const { mechanics } = useSelector((state: RootState) => state.mechanicsSlice);
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);
  const currentLang = useCurrentLanguage();

  if (mechanics.length <= 0) {
    console.log("no mechanics were found");
    return null;
  }

  const headerName = sidebarTranslator[currentLang].mechanics;
  const t = mechanicsFormTranslator[currentLang];

  const groupedMechanics = groupdMechanics(types, mechanics);
  // Сгруппировать механики, у которых нет типа (например, typeId === "unknown" или не определен)
  const mechanicsWithoutType = unsortedMechanics(types, mechanics);

  // Добавляем механики без типа в отдельную группу
  if (mechanicsWithoutType.length > 0) {
    groupedMechanics.push({
      type: { id: "null", type: "unspecified" },
      mechanics: mechanicsWithoutType,
    });
  }

  return (
    <div className={overviewStyles.overview_container} id="mechanics">
      <h2 className={overviewStyles.overview_header}>{headerName}</h2>
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {groupedMechanics.length > 0
          ? groupedMechanics.map((gr: GroupedMechanics) => (
              <li key={gr.type.id}>
                <OverviewMechanicsElement
                  group={gr}
                  t={t}
                ></OverviewMechanicsElement>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
