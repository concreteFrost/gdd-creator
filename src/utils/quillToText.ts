import { htmlToText } from "html-to-text";

export const formatQuillOutput = (html: string): string => {
  return htmlToText(html, {
    wordwrap: 130, // Устанавливает ширину строки
    selectors: [
      // Обработка заголовков
      { selector: "h1", format: "heading", options: { uppercase: false } },
      { selector: "h2", format: "heading", options: { uppercase: false } },
      { selector: "h3", format: "heading", options: { uppercase: false } },

      // Обработка параграфов
      { selector: "p", format: "inline" },

      // Обработка ссылок
      {
        selector: "a",
        options: {
          hideLinkHrefIfSameAsText: true,
          ignoreHref: false,
        },
      },

      // Обработка списков
      { selector: "ul", format: "list" },
      { selector: "ol", format: "list" },
    ],

    preserveNewlines: true, // Сохраняет разрывы строк
  });
};
