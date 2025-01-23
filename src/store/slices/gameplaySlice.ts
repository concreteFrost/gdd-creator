import { GamePlay } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GamePlayState {
  gameplay: GamePlay;
}

const initialState: GamePlayState = {
  gameplay: {
    id: "",
    story: "",
    objectives: [],
    progression: [],
    difficulty: "",
    pacing: "",
    player_experience: "",
  },
};

const gameplaySlice = createSlice({
  name: "gameplay",
  initialState,
  reducers: {
    createGameplay: (state, action: PayloadAction<GamePlay>) => {
      state.gameplay = {
        ...state.gameplay,
        id: action.payload.id,
      };
    },
    editGameplay: (
      state,
      action: PayloadAction<Omit<GamePlay, "id" | "gddId">>
    ) => {
      state.gameplay = {
        ...state.gameplay,
        story: action.payload.story,
        difficulty: action.payload.difficulty,
        objectives: action.payload.objectives,
        pacing: action.payload.pacing,
        progression: action.payload.progression,
        player_experience: action.payload.player_experience,
      };
    },
    clearGameplay: () => {},
  },
});

export const initialGameplay = gameplaySlice.getInitialState();
export const { createGameplay, editGameplay } = gameplaySlice.actions;
export default gameplaySlice.reducer;
