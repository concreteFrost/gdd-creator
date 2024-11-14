import React from "react";
import * as s from "@styles/modules/button.module.scss";

interface CreateButtonProps {
  title: string;
  action: () => void;
}
export default function CreateButton({ action, title }: CreateButtonProps) {
  const handleAction = () => action();
  return (
    <button className={s.create_btn} onClick={handleAction}>
      {title}
    </button>
  );
}
