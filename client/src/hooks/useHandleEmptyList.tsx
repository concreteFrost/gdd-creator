import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import { GameLocation, GameMechanic } from "@_types/gddTypes";

interface EmptyListProps {
  data: GameLocation[] | GameMechanic[];
}
// Кастомный хук для обработки механиков
export function useHandleEmptyList({ data }: EmptyListProps) {
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span>currently this list is empty...</span>

        <CreateButton title="ADD" action={() => navigate("new")}></CreateButton>
      </div>
    );
  }

  return null; // Если механики есть, ничего не рендерим (или можно вернуть другую логику)
}
