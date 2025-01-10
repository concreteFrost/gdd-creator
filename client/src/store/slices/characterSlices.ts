import { Character, NewCharacter } from "@_types/gddTypes";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface CharactersState{
    characters:Character[]
}

const initialState : CharactersState={
    characters:[]
}

const characterSlice = createSlice({
    name:"characters",
    initialState,
    reducers:{
        addCharacter:(state,action:PayloadAction<NewCharacter>)=>{
            const id = uuidv4();
            const character : Character={
                ...action.payload, id: id
            }
            state.characters.push(character);
        },
        editCharacter:(state,action:PayloadAction<Character>)=>{
            const index = state.characters.findIndex((c : Character)=> c.id === action.payload.id);

            if(index === -1) return;

            state.characters[index] = {...state.characters[index], ...action.payload}
        },
        deleteCharacter:(state,action:PayloadAction<string>)=>{
            state.characters = state.characters.filter((c:Character)=>c.id !== action.payload)
        }
    }
})

export const initialCharacters = characterSlice.getInitialState();
export const {addCharacter,editCharacter,deleteCharacter } = characterSlice.actions;
export default characterSlice.reducer;

