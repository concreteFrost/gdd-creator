export interface MechanicFormElements {
  nameLabel: string,
  typeLabel: string,
  selectTypePlaceholder: string,
  editTypesButton: string,
  examplesLabel: string,
  examplesHint:string,
  descriptionLabel: string,
  saveButton: string,
  requiredError: string,
  success:string
}

interface MechanincsFormTranslator{
  en:MechanicFormElements,
  ru:MechanicFormElements
} 

export const mechanicsFormTranslator : MechanincsFormTranslator = {
  en: {
    nameLabel: "Name*",
    typeLabel: "Type*",
    selectTypePlaceholder: "Unspecified",
    editTypesButton: "EDIT TYPES",
    examplesLabel: "Examples",
    examplesHint:"press enter to add",
    descriptionLabel: "Description",
    saveButton: "Save",
    requiredError: "Name and Type are required",
    success:"Success"
  },
  ru: {
    nameLabel: "Название*",
    typeLabel: "Тип*",
    selectTypePlaceholder: "Не указано",
    editTypesButton: "ТИПЫ",
    examplesLabel: "Примеры",
    examplesHint:"нажмите ENTER чтобы добавить",
    descriptionLabel: "Описание",
    saveButton: "Сохранить",
    requiredError: "Имя и Тип обязательны для заполнения",
    success:"Сохранено"
  },
};
