import { GameMechanic, MechanicType, GroupedMechanics } from "@_types/gddTypes";

export const groupdMechanics = (
  types: MechanicType[],
  mechanics: GameMechanic[]
): GroupedMechanics[] =>
  types.map((type: MechanicType) => {
    // Фильтруем механики по типу
    const mechanicsByType: GameMechanic[] = mechanics.filter(
      (mech: GameMechanic) => mech.typeId === type.id
    );

    return { type, mechanics: mechanicsByType };
  });

export const unsortedMechanics = (mechanics: GameMechanic[]) =>
  mechanics.filter(
    (mech: GameMechanic) => !mech.typeId || mech.typeId === "unknown"
  );
