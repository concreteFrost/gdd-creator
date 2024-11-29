import { GamePlatform, GameView, GDD } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState: GDD = {
  id: "",
  title: "",
  genre: "",
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
    editGeneralInfo(state, action: PayloadAction<GDD>) {
      return {
        ...state,
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
