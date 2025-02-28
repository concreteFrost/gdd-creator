import { Character, NewCharacter } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { closeGDD } from "./gddSlice";

export interface CharactersState {
  characters: Character[];
}

const initialState: CharactersState = {
  characters: [],
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      // const a = JSON.parse(action.payload.abilities.toString());
      // const t = JSON.parse(action.payload.traits.toString());
      const character: Character = {
        ...action.payload,
      };
      state.characters.push(character);
    },
    editCharacter: (state, action: PayloadAction<Character>) => {
      const index = state.characters.findIndex(
        (c: Character) => c.id === action.payload.id
      );

      if (index === -1) return;

      state.characters[index] = {
        ...state.characters[index],
        ...action.payload,
      };
    },
    deleteCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(
        (c: Character) => c.id !== action.payload
      );
    },
    duplicateCharacter: (state, action: PayloadAction<Character>) => {
      const dup = { ...action.payload, id: uuidv4() };
      state.characters.push(dup);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(closeGDD, () => {
      console.log("deleting characters");
      return initialState;
    });
  },
});

export const initialCharacters = characterSlice.getInitialState();
export const {
  addCharacter,
  editCharacter,
  deleteCharacter,
  duplicateCharacter,
} = characterSlice.actions;
export default characterSlice.reducer;
