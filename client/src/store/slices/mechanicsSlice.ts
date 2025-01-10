import { GameMechanic, MechanicType, NewMechnicForm } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { deleteMechanicType } from "./mechanicsTypeSlice";

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
    addMechanic: (state, action: PayloadAction<NewMechnicForm>) => {
      state.mechanics.push({ ...action.payload, id: uuidv4() });
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      deleteMechanicType,
      (state, action: PayloadAction<string>) => {
        state.mechanics = state.mechanics.map((m: GameMechanic) => {
          if (m.typeId === action.payload) {
            console.log('found dependant mechanic')
            return { ...m, typeId: "unspecified" };
          }
          return m;
        });
      }
    );
  },
});

export const initialMechanics = mechanicsSlice.getInitialState();

export const { addMechanic, editMechanic, deleteMechanic } =
  mechanicsSlice.actions;
export default mechanicsSlice.reducer;
export const d = mechanicsSlice;
