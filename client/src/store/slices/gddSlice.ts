import { GamePlatform, GameView, GDD } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState: GDD = {
  id: "",
  title: "",
  genre: "",
  mechanics: [], // List of game mechanics
  gameplay: null, // Game play details
  locations: [], // Locations in the game
  characters: [], // Main characters in the game
  view: GameView.FirstPerson, // Visual style of the game (e.g., 2D, 3D)
  platform: GamePlatform.PC, // Platforms the game is targeting (e.g., PC, Mobile)
};

const gddSlice = createSlice({
  name: "gdd",
  initialState,
  reducers: {
    createGDD: (state, action: PayloadAction<GDD>) => {
      const id = uuidv4();
      return { ...action.payload, id: id };
    },
  },
});

export const { createGDD } = gddSlice.actions;
export default gddSlice.reducer;
