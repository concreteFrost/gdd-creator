import { GamePlay } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { closeGDD } from "./gddSlice";

interface GamePlayState {
  gameplay: GamePlay;
}

const initialState: GamePlayState = {
  gameplay: {
    id: "",
    story: "",
    objectives: [],
    progressions: [],
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
        progressions: action.payload.progressions,
        player_experience: action.payload.player_experience,
      };
    },
    clearGameplay: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(closeGDD, () => {
      return initialState;
    });
  },
});

export const initialGameplay = gameplaySlice.getInitialState();
export const { createGameplay, editGameplay } = gameplaySlice.actions;
export default gameplaySlice.reducer;
