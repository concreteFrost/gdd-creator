import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  email: string;
  selectedGDD: string | null;
  token: string | null;
}

const initialState: AuthState = {
  username: "",
  email: "",
  token: null,
  selectedGDD: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<AuthState, "selectedGDD">>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout: () => {
      return initialState;
    },
    setSelectedGDD: (state, action: PayloadAction<string | null>) => {
      state.selectedGDD = action.payload;
    },
  },
});

export const { login, logout, setSelectedGDD } = authSlice.actions;
export default authSlice.reducer;
