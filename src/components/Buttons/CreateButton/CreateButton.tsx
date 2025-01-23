import * as s from "../Button.module.scss";

interface CreateButtonProps {
  title: string;
  action: () => void;
}

export default function CreateButton({ action, title }: CreateButtonProps) {
  function handleAction() {
    action();
  }
  return (
    <button className={s.create_btn} onClick={handleAction}>
      {title}
    </button>
  );
}
