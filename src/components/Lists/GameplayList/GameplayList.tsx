import React from "react";
import * as list_style from "./GameplayList.module.scss";
import { icons } from "@assets/icons";

interface ListProps<T> {
  title: string;
  item: T[];
  renderItem: (item: T) => React.ReactNode;
  deleteItem: (id: T) => void;
}

export default function GameplayList<T>({
  title,
  item,
  renderItem,
  deleteItem,
}: ListProps<T>) {
  if (item.length === 0) {
    return (
      <div>
        <h3>{title}</h3>
      </div>
    );
  }

  return (
    <div className={list_style.gameplay_list}>
      <h3>{title}</h3>
      <ul>
        {item.map((item, id) => (
          <li key={id}>
            {" "}
            <span>{renderItem(item)}</span>
            <button onClick={() => deleteItem(item)} type="button">
              {icons.delete}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
