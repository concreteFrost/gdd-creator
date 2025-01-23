export interface LocationFormElements{
    name:string,
    nameRequired: string,
    environment: string,
    description: string,
    characters: string,
    mainImage: string,
    additionalImages: string,
    save: string,
    notFound:string,
    successMessage:string
}

interface LocationsFormTranslator{
  en:LocationFormElements,
  ru:LocationFormElements
}

export const locationsFormTranslator:LocationsFormTranslator = {
    en: {
      name: "Name",
      nameRequired: "Name is required",
      environment: "Environment",
      description: "Description",
      characters: "Characters",
      mainImage: "Main Image",
      additionalImages: "Additional Images",
      save: "Save",
      notFound:"locationNotFound",
      successMessage:"Success"
    },
    ru: {
      name: "Название",
      nameRequired: "Название обязательно",
      environment: "Окружающая среда",
      description: "Описание",
      characters: "Персонажи",
      mainImage: "Главное изображение",
      additionalImages: "Дополнительные изображения",
      save: "Сохранить",
      notFound:"Локация не найдена",
      successMessage:"Сохранено"
    },
  };

  