interface GDDFormLabels {
    title: string;
    genre: string;
    platform: string;
    view: string;
    saveButton: string;
    closeButton: string;
    titleRequired: string;
    successMessage:string;
}

interface GDDTranslator {
    en: GDDFormLabels;
    ru: GDDFormLabels;
}

export const gddFormTranslator: GDDTranslator = {
    en: {
        title: "Title*",
        genre: "Genre",
        view: "Game View",
        platform: "Platform",
        saveButton: "Save",
        closeButton: "Close",
        titleRequired: "Game title is required",
        successMessage:"Success"
    },
    ru: {
        title: "Название*",
        genre: "Жанр",
        view: "Вид",
        platform: "Платформа",
        saveButton: "Сохранить",
        closeButton: "Закрыть",
        titleRequired: "Название не может быть пустым",
        successMessage:"Сохранено"
    }
}