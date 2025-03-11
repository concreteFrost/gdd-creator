export interface GameplayFormTranslator {
  story: string;
  objectives: string;
  objectivesHint: string;
  progression: string;
  progressionHint: string;
  difficulty: string;
  pacing: string;
  player_experience: string;
  save: string;
  saveBtn: string;
}

export const gamplayFormTranslator = {
  en: {
    story: "Story",
    objectives: "Objectives",
    objectivesHint: "press enter to add",
    progression: "Progression",
    progressionHint: "press enter to add",
    difficulty: "Difficulty",
    pacing: "Pacing",
    player_experience: "Player Experience",
    save: "Saved",
    saveBtn: "Save",
  },
  ru: {
    story: "Описание",
    objectives: "Цели",
    objectivesHint: "нажмите Enter, чтобы добавить",
    progression: "Прогрессия",
    progressionHint: "нажмите Enter, чтобы добавить",
    difficulty: "Сложность",
    pacing: "Темп игры",
    player_experience: "Опыт игрока",
    save: "Сохранено",
    saveBtn: "Сохранить",
  },
};
