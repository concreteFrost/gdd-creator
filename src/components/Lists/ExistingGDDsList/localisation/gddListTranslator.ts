interface GDDList {
  header: string;
  emptyListMessage: string;
}

interface GDDListTranslator {
  en: GDDList;
  ru: GDDList;
}

export const gddListTranslator: GDDListTranslator = {
  en: {
    header: "GDD LIST",
    emptyListMessage: "no gdds to show...",
  },
  ru: {
    header: "СПИСОК GDD",
    emptyListMessage: "спиоск пуст...",
  },
};
