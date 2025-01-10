import { useNavigate } from "react-router-dom";
import CreateButton from "@components/Buttons/CreateButton/CreateButton";
import { Character, GameLocation, GameMechanic } from "@_types/gddTypes";
import { useCurrentLanguage } from "./useCurrentLanguage";
import { useHandleEmptyListTranslator } from "./localisation/useHandleEmptyListTranslator";

interface EmptyListProps {
  data: GameLocation[] | GameMechanic[] | Character[];
}
// Кастомный хук для обработки механиков
export function useHandleEmptyList({ data }: EmptyListProps) {
  const navigate = useNavigate();
  const currentLang = useCurrentLanguage();
  const loc = useHandleEmptyListTranslator[currentLang];

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span>{loc.message}</span>
        <CreateButton title={loc.buttonText} action={() => navigate("new")}></CreateButton>
      </div>
    );
  }

  return null; // Если механики есть, ничего не рендерим (или можно вернуть другую логику)
}
