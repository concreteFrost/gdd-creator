import { GameMechanic, GamePlay, MechanicType } from "@_types/gddTypes";

export const mockMechanics: GameMechanic[] = [
  {
    id: "123",
    name: "Grab",
    description: "Test Description",
    typeId: "1",
    interactions: [],
    examples: [],
    gddId: "1",
  },
  {
    id: "234",
    name: "Shooting",
    description: "Shooting desc",
    typeId: "2",
    interactions: [],
    examples: [],
    gddId: "1",
  },
];

export const mockTypes: MechanicType[] = [
  {
    id: "1",
    type: "interaction",
  },
  {
    id: "2",
    type: "shooting",
  },
];

export const mockGameplay: GamePlay = {
  id: "1",
  gddId: "1",
  story:
    "A post-apocalyptic world where survivors band together to rebuild society.",
  objectives: [
    "Gather resources",
    "Build a shelter",
    "Defend against raiders",
    "Uncover the cause of the apocalypse",
  ],
  progression: ["Crafting items", "Recruiting allies", "Expanding territory"],
  difficulty: "Hard",
  pacing: "Slow-building",
  playerExperience: "Survival-focused with moments of high tension",
};
