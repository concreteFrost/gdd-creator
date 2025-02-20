import { GameMechanic, MechanicType, NewMechnicForm } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { deleteMechanicType } from "./mechanicsTypeSlice";
import { closeGDD } from "./gddSlice";

export interface MechanicsState {
  mechanics: Array<GameMechanic>;
}

const initialState: MechanicsState = {
  mechanics: [],
};

const mechanicsSlice = createSlice({
  name: "mechanics",
  initialState,
  reducers: {
    addMechanic: (state, action: PayloadAction<GameMechanic>) => {
      state.mechanics.push(action.payload);
    },
    editMechanic: (state, action: PayloadAction<GameMechanic>) => {
      const index = state.mechanics.findIndex(
        (m: GameMechanic) => m.id === action.payload.id
      );

      if (index === -1) return;

      state.mechanics[index] = { ...state.mechanics[index], ...action.payload };
    },
    deleteMechanic: (state, action: PayloadAction<string>) => {
      state.mechanics = state.mechanics.filter(
        (m: GameMechanic) => m.id !== action.payload
      );
    },
    duplicateMechanic: (state, action: PayloadAction<GameMechanic>) => {
      var dup = { ...action.payload, id: uuidv4() };

      state.mechanics.push(dup);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      deleteMechanicType,
      (state, action: PayloadAction<string>) => {
        state.mechanics = state.mechanics.map((m: GameMechanic) => {
          if (m.type_id === action.payload) {
            return { ...m, type_id: "null" };
          }
          return m;
        });
      }
    );
    builder.addCase(closeGDD, () => {
      return initialState;
    });
  },
});

export const initialMechanics = mechanicsSlice.getInitialState();

export const { addMechanic, editMechanic, deleteMechanic, duplicateMechanic } =
  mechanicsSlice.actions;
export default mechanicsSlice.reducer;
export const d = mechanicsSlice;
