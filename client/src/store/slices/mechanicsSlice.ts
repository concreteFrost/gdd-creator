import { GameMechanic, MechanicType } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface MechanicsState {
  mechanics: Array<GameMechanic>;
  types: MechanicType[];
}

const initialState: MechanicsState = {
  mechanics: [],
  types: [],
};

const mechanicsSlice = createSlice({
  name: "mechanics",
  initialState,
  reducers: {
    addMechanic: (state, action: PayloadAction<GameMechanic>) => {
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
    addMechanicType: (state, action: PayloadAction<MechanicType>) => {
      state.types.push({ ...action.payload });
    },
    deleteMechanicType: (state, action: PayloadAction<string>) => {
      state.types = state.types.filter(
        (t: MechanicType) => t.id !== action.payload
      );
      state.mechanics = state.mechanics.map((m: GameMechanic) => {
        if (m.typeId === action.payload) {
          return { ...m, typeId: "unknown" };
        }
        return m;
      });
    },
    editMechanicType: (state, action: PayloadAction<MechanicType>) => {
      const index = state.types.findIndex(
        (m: MechanicType) => m.id === action.payload.id
      );

      if (index === -1) return;

      state.types[index] = { ...state.types[index], ...action.payload };
    },
  },
});

export const initialMechanics = mechanicsSlice.getInitialState();

export const {
  addMechanic,
  editMechanic,
  deleteMechanic,
  addMechanicType,
  deleteMechanicType,
  editMechanicType,
} = mechanicsSlice.actions;
export default mechanicsSlice.reducer;
export const d = mechanicsSlice;
