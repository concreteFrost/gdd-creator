export interface CharacterFormFields {
  name: string,
  role: string,
  backstory: string,
  abilities: string,
  traits: string,
  mainImage: string,
  additionalImages: string,
  save: string,
  success: string,
  nameRequired: string,
  characterNotFound: string;
}

interface CharacterFormTranslator {
  en: CharacterFormFields,
  ru: CharacterFormFields
}

export const characterFormTranslator: CharacterFormTranslator = {
  en: {

    name: "Name*",
    role: "Role",
    backstory: "Backstory",
    abilities: "Abilities",
    traits: "Traits",
    mainImage: "Main Image",
    additionalImages: "Additional Images",
    save: "Save",
    nameRequired: "Name is required",
    characterNotFound: "Character not found",
    success: "Success"
  },
  ru: {

    name: "Имя*",
    role: "Роль",
    backstory: "Предыстория",
    abilities: "Способности",
    traits: "Черты",
    mainImage: "Основное изображение",
    additionalImages: "Дополнительные изображения",
    save: "Сохранить",
    nameRequired: "Имя обязательно для заполнения",
    characterNotFound: "Запрашиваемый персонаж не найден",
    success: "Сохранено"
  },
};
