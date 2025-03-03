// Enums for View and Platform
export enum GameView {
  FirstPerson = "First Person",
  ThirdPerson = "Third Person",
  TopDown = "Top Down",
  SideScroller = "Side Scroller",
  Isometric = "Isometric",
  TwoD = "2D",
  ThreeD = "3D",
}

export enum GamePlatform {
  PC = "PC",
  PlayStation = "PlayStation",
  Xbox = "Xbox",
  NintendoSwitch = "Nintendo Switch",
  Mobile = "Mobile",
  Web = "Web",
  VR = "VR",
  AR = "AR",
  Miltiplatform = "Multiplatform",
}

// Main GDD Interface
export interface GDD {
  id: string;
  title: string;
  genre: string;
  view: GameView; // Visual style of the game (e.g., 2D, 3D)
  platform: GamePlatform; // Platforms the game is targeting (e.g., PC, Mobile)
}

// Gameplay Interface
export interface GamePlay {
  id: string;
  story: string; // Brief story or narrative of the game
  objectives: GameObjective[]; // Game objectives (e.g., main quests, side missions)
  progressions: GameProgression[]; // How the player progresses (e.g., leveling up, unlocking areas)
  difficulty: string; // Difficulty settings (e.g., Easy, Hard)
  pacing: string; // Game pacing (e.g., fast-paced, slow-building)
  player_experience: string; // Type of experience expected for the player (e.g., strategic, fast reflexes)
}

// Game Mechanics Interface
export interface GameMechanic {
  id: string;
  name: string; // Name of the mechanic (e.g., Jump, Combat)
  description: string; // Explanation of how it works in the game
  type_id: string | null; // Type of mechanic (e.g., Action, Puzzle)
  //interactions: string[]; // List of other mechanics this interacts with
  examples: Array<string>; // Examples in games that use similar mechanics
}

export interface MechanicExample {
  id: string;
  example: string;
}

export interface MechanicType {
  id: string;
  type: string;
}

export interface GroupedMechanics {
  type: MechanicType;
  mechanics: GameMechanic[];
}

export interface GameObjective {
  id: string;
  name: string;
}

export interface GameProgression {
  id: string;
  name: string;
}

// Location Interface
export interface GameLocation {
  id: string;
  name: string; // Name of the location
  description: string; // Description of the location (setting, atmosphere)
  environment: string; // Environment (e.g., city, forest, dungeon)
  characters: string[]; // Characters associated with the location
  //items: string[]; // List of items found in the location
  img: string | null;
  // additionalImages: GDDElementImage[] | null;
}

export interface GDDElementImage {
  id: string;
  path: string;
  width?: number; // Ширина изображения
  height?: number; // Высота изображения
  caption?: string; // Подпись к изображению
}

export interface CharacterAbilities {
  id: string;
  ability: string;
}

export interface CharacterTraits {
  id: string;
  trait: string;
}

// Character Interface
export interface Character {
  id: string;
  name: string; // Name of the character
  role: string; // Role in the game (e.g., protagonist, antagonist, NPC)
  backstory: string; // Character's background story
  abilities: string[]; // Abilities or special skills
  traits: string[]; // Personality traits (e.g., brave, cautious)
  img: string | null;
  // additionalImages: GDDElementImage[];
  // gddId: string;
}

export type NewMechnicForm = Omit<GameMechanic, "id">;
export interface NewCharacter extends Character {
  imageInstance: File | null;
}
export interface NewGameLocation extends GameLocation {
  imageInstance: File | null;
}
