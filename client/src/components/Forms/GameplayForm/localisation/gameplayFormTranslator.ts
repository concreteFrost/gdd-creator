export interface GameplayFormTranslator{

    story: string,
    objectives: string,
    objectivesHint: string,
    progression: string,
    progressionHint: string,
    difficulty: string,
    pacing: string,
    playerExperience: string,
    save: string,
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
      playerExperience: "Player Experience",
      save: "Save",
    },
    ru: {
     
      story: "Сюжет",
      objectives: "Цели",
      objectivesHint: "нажмите Enter, чтобы добавить",
      progression: "Прогрессия",
      progressionHint: "нажмите Enter, чтобы добавить",
      difficulty: "Сложность",
      pacing: "Темп игры",
      playerExperience: "Опыт игрока",
      save: "Сохранить",
    },
  };
  