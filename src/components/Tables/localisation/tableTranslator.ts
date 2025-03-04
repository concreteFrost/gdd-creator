export interface TableWithImagesLabels {
  nameHeader: string;
  actionHeader: string;
  onDeleteMessage: (name: string) => string;
}

interface TableWithImagesTranslator {
  en: TableWithImagesLabels;
  ru: TableWithImagesLabels;
}
export const tableTranslator: TableWithImagesTranslator = {
  en: {
    nameHeader: "NAME",
    actionHeader: "ACTIONS",
    onDeleteMessage: (name: string) =>
      `Are you sure you want to delete ${name} ?`,
  },
  ru: {
    nameHeader: "ИМЯ",
    actionHeader: "ДЕЙСТВИЯ",
    onDeleteMessage: (name: string) =>
      `Вы уверены что хотите удалить ${name} ?`,
  },
};
