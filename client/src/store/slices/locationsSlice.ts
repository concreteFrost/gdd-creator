import { GameLocation, NewGameLocation } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface LocationsState {
  locations: GameLocation[];
}

const initialState: LocationsState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<NewGameLocation>) => {
      state.locations.push({ ...action.payload, id: uuidv4() });
    },
    editLocation: (state, action: PayloadAction<GameLocation>) => {
      const index = state.locations.findIndex(
        (location: GameLocation) => location.id === action.payload.id
      );

      if (index === -1) return;

      state.locations[index] = { ...state.locations[index], ...action.payload };
    },
    deleteLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (location: GameLocation) => location.id !== action.payload
      );
    },
  },
});

export const initialLocations = locationsSlice.getInitialState();
export const { addLocation, editLocation, deleteLocation } =
  locationsSlice.actions;
export default locationsSlice.reducer;
