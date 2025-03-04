import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ActiveModal {
  None = "None",
  Info = "Info",
  Redirect = "Redirect",
  Confirmation = "Confirmation",
}

export enum ConfirmationModalActions {
  DeleteMechanic = "DeleteMechanic",
  DeleteCharacter = "DeleteCharacter",
  DeleteLocation = "DeleteLocation",
  DeleteGDD = "DeleteGDD",
  DeleteAccount = "DeleteAccout",
}

export interface ModalState {
  text: string;
  activeModal: ActiveModal;
  confirmAction?: {
    action: ConfirmationModalActions;
    payload: any;
    isComplete: boolean;
  } | null;
}

const initialState: ModalState = {
  text: "",
  activeModal: ActiveModal.None,
  confirmAction: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => {
      console.log(action);
      return action.payload;
    },
    closeModal: (state) => {
      state.activeModal = ActiveModal.None;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
