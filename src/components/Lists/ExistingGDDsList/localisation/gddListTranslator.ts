interface GDDList {
  header: string;
  emptyListMessage: string;
  onDeleteMessage: (name: string) => string;
}

interface GDDListTranslator {
  en: GDDList;
  ru: GDDList;
}

export const gddListTranslator: GDDListTranslator = {
  en: {
    header: "GDD LIST",
    emptyListMessage: "no gdds to show...",
    onDeleteMessage: (name: string) =>
      `Are you sure you want to delete ${name} ?`,
  },
  ru: {
    header: "СПИСОК GDD",
    emptyListMessage: "спиоск пуст...",
    onDeleteMessage: (name: string) =>
      `Вы уверены что хотите удалить ${name} ?`,
  },
};
