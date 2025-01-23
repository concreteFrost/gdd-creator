import {
    addCharacter,
    editCharacter,
    deleteCharacter,
    CharactersState,
} from "@store/slices/characterSlices";
import charactersSlice, { initialCharacters } from "@store/slices/characterSlices";
import { Character, NewCharacter } from "@_types/gddTypes";
import { mockCharacters } from "@mocks/gdd/gddStoreMock";

describe("characterSlice", () => {
    let slice: CharactersState;

    it("should add new character", () => {
        const newCharacter: NewCharacter = mockCharacters[0];
        const onAdd = charactersSlice(initialCharacters, addCharacter(newCharacter));
        expect(onAdd.characters[0].name).toBe(newCharacter.name);

    });
    it("should edit character",()=>{
        const newCharacter: NewCharacter = mockCharacters[0];
        const onAdd = charactersSlice(initialCharacters, addCharacter(newCharacter));
        const editedCharacter: Character = {
            ...onAdd.characters[0],
            name: "Updated Name",
            role: "Updated Role",
        };
        const onEdit = charactersSlice(onAdd, editCharacter(editedCharacter));
        
        expect(onEdit.characters[0].name).toBe("Updated Name");
        expect(onEdit.characters[0].role).toBe("Updated Role");
        
    });
    it("should delete character",()=>{
        const newCharacter: NewCharacter = mockCharacters[0];
        const onAdd = charactersSlice(initialCharacters, addCharacter(newCharacter));
        const onDelete = charactersSlice(onAdd,deleteCharacter(onAdd.characters[0].id));

        expect(onDelete.characters.length).toEqual(0);

    })
})

