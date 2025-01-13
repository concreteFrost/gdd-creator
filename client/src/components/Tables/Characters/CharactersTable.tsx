import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCharacter,
  duplicateCharacter,
} from "@store/slices/characterSlices";
import { useHandleEmptyList } from "@hooks/useHandleEmptyList";
import TableWithImages from "../TableWithImages";

export default function CharactersTable() {
  const characters = useSelector(
    (state: RootState) => state.charactersSlice.characters
  );

  const dispatch = useDispatch();

  const emptyCharactersHandler = useHandleEmptyList({ data: characters });
  if (emptyCharactersHandler) return emptyCharactersHandler;

  const sortedCharacters = [...characters].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  function handleDeleteCharacter(id: string) {
    dispatch(deleteCharacter(id));
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
