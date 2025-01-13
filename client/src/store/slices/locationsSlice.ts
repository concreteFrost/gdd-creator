import { Character, GameLocation, NewGameLocation } from "@_types/gddTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { deleteCharacter } from "./characterSlices";

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

    duplicateLocation: (state, action: PayloadAction<GameLocation>) => {
      const dup = { ...action.payload, id: uuidv4() };
      state.locations.push(dup);
    },
  },
  extraReducers(builder) {
    builder.addCase(deleteCharacter, (state, action: PayloadAction<string>) => {
      state.locations = state.locations.map((location: GameLocation) => ({
        ...location,
        characters: location.characters.filter(
          (characterId: string) => characterId !== action.payload
        ),
      }));
    });
  },
});

export const initialLocations = locationsSlice.getInitialState();
export const { addLocation, editLocation, deleteLocation, duplicateLocation } =
  locationsSlice.actions;
export default locationsSlice.reducer;
