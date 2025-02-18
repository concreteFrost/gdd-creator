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

export default function CharactersTable() {
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

  function handleDup(item: any) {
    dispatch(duplicateCharacter(item));
  }

  return (
    <TableWithImages
      handleDup={handleDup}
      data={sortedCharacters}
      handleDeteleItem={handleDeleteCharacter}
    ></TableWithImages>
  );
}
