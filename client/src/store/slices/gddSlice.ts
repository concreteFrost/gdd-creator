import { GamePlatform, GameView, GDD } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface GDDState {
  gdd: GDD;
}

export const initialState: GDDState = {
  gdd: {
    id: "",
    title: "",
    genre: "",
    view: GameView.FirstPerson, // Visual style of the game (e.g., 2D, 3D)
    platform: GamePlatform.PC, // Platforms the game is targeting (e.g., PC, Mobile)
  },
};

const gddSlice = createSlice({
  name: "gdd",
  initialState,
  reducers: {
    createGDD: (state, action: PayloadAction<GDD>) => {
      const id = uuidv4();
      state.gdd = { ...action.payload, id: id };
    },
    editGeneralInfo: (state, action: PayloadAction<GDD>) => {
      state.gdd = {
        ...state.gdd,
        title: action.payload.title,
        genre: action.payload.genre,
        view: action.payload.view,
        platform: action.payload.platform,
      };
    },
  },
});

export const { createGDD, editGeneralInfo } = gddSlice.actions;
export default gddSlice.reducer;
