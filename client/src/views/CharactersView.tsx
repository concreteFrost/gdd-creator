import EditCharacterForm from "@components/Forms/CharacterForm/EditCharacterForm";
import NewCharacterForm from "@components/Forms/CharacterForm/NewCharacterForm";
import CharactersTable from "@components/Tables/Characters/CharactersTable";
import { Route, Routes } from "react-router-dom";

export default function CharactersView() {
  return (
    <Routes>
      <Route path="new" element={<NewCharacterForm/>}></Route>
      <Route
        path=":characterId"
        element={<EditCharacterForm/>}
      ></Route>
      <Route path="/" element={<CharactersTable/>}></Route>
    </Routes>
  );
}
