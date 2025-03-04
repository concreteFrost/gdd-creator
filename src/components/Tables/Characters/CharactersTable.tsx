import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCharacter,
  duplicateCharacter,
} from "@store/slices/characterSlices";
import { useHandleEmptyList } from "@hooks/useHandleEmptyList";
import TableWithImages from "../TableWithImages";
import { deleteCharacterAPI } from "@services/charactersAPI";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { Character, GameLocation } from "@_types/gddTypes";
import withConfirmationModal from "@components/_hoc/withConfirmationModal";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { tableTranslator } from "../localisation/tableTranslator";

interface CharacterTableProps {
  showConfirmationModal?: (text: string, callback: () => void) => void;
}
function CharactersTable({ showConfirmationModal }: CharacterTableProps) {
  const currentLang = useCurrentLanguage();
  const loc = tableTranslator[currentLang];
  const characters = useSelector(
    (state: RootState) => state.charactersSlice.characters
  );
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  const dispatch = useDispatch();

  const emptyCharactersHandler = useHandleEmptyList({ data: characters });
  if (emptyCharactersHandler) return emptyCharactersHandler;

  const sortedCharacters = [...characters].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  async function handleDeleteCharacter(id: string) {
    try {
      const res = await deleteCharacterAPI(id, gddId);

      console.log(res);

      if (res.success) {
        dispatch(deleteCharacter(id));
      }
    } catch (error: any) {
      dispatch(
        showModal({
          activeModal: ActiveModal.Info,
          text: "Something went wrong",
        })
      );
    }
  }

  async function handleDeleteButtonClick(character: Character | GameLocation) {
    if (!showConfirmationModal) return;

    showConfirmationModal(loc.onDeleteMessage(character.name), () =>
      handleDeleteCharacter(character.id)
    );
  }

  function handleDup(item: any) {
    dispatch(duplicateCharacter(item));
  }

  return (
    <TableWithImages
      handleDup={handleDup}
      data={sortedCharacters}
      handleDeteleItem={handleDeleteButtonClick}
      loc={loc}
    ></TableWithImages>
  );
}

export default withConfirmationModal(CharactersTable);
