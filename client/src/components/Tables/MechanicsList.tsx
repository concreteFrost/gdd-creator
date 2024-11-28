import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { GroupedMechanics } from "@_types/gddTypes";
import MechanicsTable from "./MechanicsTable";
import {
  groupdMechanics,
  unsortedMechanics,
} from "@utils/mechanics/groupMechanicsByType";
import { useMemo, useState } from "react";

// Компонент списка механик
export default function MechanicsList() {
  const navigate = useNavigate();

  const [input, setInput] = useState<string>("");

  // Получаем список механик из Redux состояния
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
    <div
      style={{
        display: "flex",
        width: "100%",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <input value={input} onChange={(e) => setInput(e.target.value)}></input>
      <ul style={{ listStyle: "none" }}>
        {groupedMechanics.length > 0
          ? groupedMechanics.map((gr: GroupedMechanics) => (
              <li key={gr.type.id}>
                <MechanicsTable group={gr}></MechanicsTable>
              </li>
            ))
          : null}
      </ul>
      <div style={{ position: "fixed", bottom: 50, right: 20 }}>
        <CreateButton
          title="Add"
          action={() => {
            navigate("new");
          }}
        />
      </div>
    </div>
  );
}
