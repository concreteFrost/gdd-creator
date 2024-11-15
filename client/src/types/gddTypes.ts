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
}

// Main GDD Interface
export interface GDD {
  id: string;
  title: string;
  genre: string;
  mechanics: GameMechanic[]; // List of game mechanics
  gameplay: GamePlay | null; // Game play details
  locations: Location[]; // Locations in the game
  characters: Character[]; // Main characters in the game
  view: GameView; // Visual style of the game (e.g., 2D, 3D)
  platform: GamePlatform; // Platforms the game is targeting (e.g., PC, Mobile)
}

// Game Mechanics Interface
export interface GameMechanic {
  name: string; // Name of the mechanic (e.g., Jump, Combat)
  description: string; // Explanation of how it works in the game
  type: string; // Type of mechanic (e.g., Action, Puzzle)
  interactions: string[]; // List of other mechanics this interacts with
  examples: string[]; // Examples in games that use similar mechanics
}

// Gameplay Interface
export interface GamePlay {
  story: string; // Brief story or narrative of the game
  objectives: string[]; // Game objectives (e.g., main quests, side missions)
  progression: string[]; // How the player progresses (e.g., leveling up, unlocking areas)
  difficulty: string; // Difficulty settings (e.g., Easy, Hard)
  pacing: string; // Game pacing (e.g., fast-paced, slow-building)
  playerExperience: string; // Type of experience expected for the player (e.g., strategic, fast reflexes)
}

// Location Interface
export interface Location {
  name: string; // Name of the location
  description: string; // Description of the location (setting, atmosphere)
  environment: string; // Environment (e.g., city, forest, dungeon)
  characters: Character[]; // Characters associated with the location
  items: string[]; // List of items found in the location
}

// Character Interface
export interface Character {
  name: string; // Name of the character
  role: string; // Role in the game (e.g., protagonist, antagonist, NPC)
  backstory: string; // Character's background story
  abilities: string[]; // Abilities or special skills
  traits: string[]; // Personality traits (e.g., brave, cautious)
}
