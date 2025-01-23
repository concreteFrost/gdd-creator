import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ActiveModal {
  None = "None",
  Info = "Info",
  Redirect = "Redirect",
}

export interface ModalState {
  text: string;
  activeModal: ActiveModal;
}

const initialState: ModalState = {
  text: "",
  activeModal: ActiveModal.None,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      return action.payload;
    },
    closeModal: (state) => {
      state.activeModal = ActiveModal.None;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
