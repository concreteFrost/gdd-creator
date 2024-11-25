import { MechanicType } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MechanicsTypeState {
  types: MechanicType[];
}

const initialState: MechanicsTypeState = {
  types: [],
};

const mechanicsTypeSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    addMechanicType: (state, action: PayloadAction<MechanicType>) => {
      state.types.push({ ...action.payload });
    },
    deleteMechanicType: (state, action: PayloadAction<string>) => {
      state.types = state.types.filter(
        (t: MechanicType) => t.id !== action.payload
      );
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

export const initialTypes = mechanicsTypeSlice.getInitialState();

export const { addMechanicType, deleteMechanicType, editMechanicType } =
  mechanicsTypeSlice.actions;

export default mechanicsTypeSlice.reducer;
