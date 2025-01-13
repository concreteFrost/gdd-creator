import {
  Character,
  GameMechanic,
  GamePlatform,
  GamePlay,
  GameView,
  GDD,
  MechanicType,
} from "@_types/gddTypes";

export const mockGdd: GDD = {
  id: "123",
  title: "New Game",
  genre: "RPG",
  platform: GamePlatform.PC,
  view: GameView.FirstPerson,
};

export const mockMechanics: GameMechanic[] = [
  {
    id: "123",
    name: "Grab",
    description: "Test Description",
    typeId: "1",
    //interactions: [],
    examples: [],
    gddId: "1",
  },
  {
    id: "234",
    name: "Shooting",
    description: "Shooting desc",
    typeId: "2",
    //interactions: [],
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
    { id: "1", name: "Gather resources" },
    { id: "2", name: "Build a shelter" },
    { id: "3", name: "Defend against raiders" },
    {
      id: "4",
      name: "Uncover the cause of the apocalypse",
    },
  ],
  progression: [
    { id: "1", name: "Crafting items" },
    { id: "2", name: "Recruiting allies" },
    { id: "3", name: "Expanding territory" },
  ],
  difficulty: "Hard",
  pacing: "Slow-building",
  playerExperience: "Survival-focused with moments of high tension",
};

export const mockCharacters: Character[] = [
  {
    id: "character-001",
    name: "Lia Silverleaf",
    role: "NPC",
    backstory:
      "A kind herbalist who helps travelers with potions and remedies.",
    abilities: [{ id: "1", ability: "Herbal Knowledge" }],
    traits: [
      { id: "1", trait: "Kind" },
      { id: "2", trait: "Wise" },
    ],
    mainImage: null,
    //additionalImages: [],
    gddId: "gdd-123",
  },
];
