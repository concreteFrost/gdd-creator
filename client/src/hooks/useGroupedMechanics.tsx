import { GameMechanic, MechanicType } from "@_types/gddTypes";
import {
  groupdMechanics,
  unsortedMechanics,
} from "@utils/mechanics/groupMechanicsByType";
import { useMemo } from "react";

export const useGroupedMechanics = (
  types: MechanicType[],
  mechanics: GameMechanic[]
) => {
  const groupedMechanics = useMemo(
    () => groupdMechanics(types, mechanics),
    [types, mechanics]
  );
  // Сгруппировать механики, у которых нет типа (например, typeId === "unknown" или не определен)
  const mechanicsWithoutType = useMemo(
    () => unsortedMechanics(mechanics),
    [mechanics]
  );
};
