import React from "react";
import * as tag_style from "@styles/modules/tags.module.scss";

interface TagListProps<T> {
  items: T[]; // Массив элементов
  renderItem: (item: T) => React.ReactNode; // Функция для рендера каждого элемента
}

export default function MechanicsTag<T>({
  items,
  renderItem,
}: TagListProps<T>) {
  return (
    <div className={tag_style.examples_container}>
      <ul>
        {items.map((item, id) => (
          <li key={id}>
            <span>{renderItem(item)}</span>
            <button type="button" className={tag_style.delete_button}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
