interface DashboardElements {
  listHeader: string;
  createButton: string;
}

interface DashboardTranslator {
  en: DashboardElements;
  ru: DashboardElements;
}

export const dashboardTranslator: DashboardTranslator = {
  en: {
    listHeader: "GDD LIST",
    createButton: "CREATE",
  },
  ru: {
    listHeader: "СПИСОК GDD",
    createButton: "СОЗДАТЬ",
  },
};
