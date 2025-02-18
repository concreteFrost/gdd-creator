import { GameMechanic, MechanicType, GroupedMechanics } from "@_types/gddTypes";

export const groupdMechanics = (
  types: MechanicType[],
  mechanics: GameMechanic[]
): GroupedMechanics[] =>
  types.map((type: MechanicType) => {
    // Фильтруем механики по типу
    const mechanicsByType: GameMechanic[] = mechanics.filter(
      (mech: GameMechanic) => mech.type_id === type.id
    );

    return { type, mechanics: mechanicsByType };
  });

export const unsortedMechanics = (
  types: MechanicType[],
  mechanics: GameMechanic[]
) =>
  mechanics.filter(
    (mech: GameMechanic) =>
      !mech.type_id ||
      !types.some((type: MechanicType) => type.id === mech.type_id)
  );
