import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { GroupedMechanics } from "@_types/gddTypes";
import MechanicsTable from "../Mechanics/MechanicsTable";
import {
  groupdMechanics,
  unsortedMechanics,
} from "@utils/mechanics/groupMechanicsByType";
import { useHandleEmptyList } from "@hooks/useHandleEmptyList";

// Компонент списка механик
export default function MechanicsList() {
  const { mechanics } = useSelector((state: RootState) => state.mechanicsSlice);
  const { types } = useSelector((state: RootState) => state.mechanicsTypeSlice);

  const mechanicsHandler = useHandleEmptyList({ data: mechanics });
  if (mechanicsHandler) return mechanicsHandler;
  // Получаем список механик из Redux состояния

  const groupedMechanics = groupdMechanics(types, mechanics);
  // Сгруппировать механики, у которых нет типа (например, typeId === "unknown" или не определен)
  const mechanicsWithoutType = unsortedMechanics(types, mechanics);

  // Добавляем механики без типа в отдельную группу
  if (mechanicsWithoutType.length > 0) {
    groupedMechanics.push({
      type: { id: "unknown", type: "unspecified" },
      mechanics: mechanicsWithoutType,
    });
  }

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {groupedMechanics.length > 0
          ? groupedMechanics.map((gr: GroupedMechanics) => (
              <li key={gr.type.id}>
                <MechanicsTable group={gr}></MechanicsTable>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
