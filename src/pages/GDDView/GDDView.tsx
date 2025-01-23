import Sidebar from "@components/Sidebar/Sidebar";
import * as gddStyle from "./GDDView.module.scss";
import { Route, Routes } from "react-router-dom";
import GeneralInfo from "@views/Overview";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { ActiveModal, ModalState, showModal } from "@store/slices/modalSlice";
import MechanicsView from "@views/MechanicsView";
import GameplayView from "@views/GameplayView";
import LocationsView from "@views/LocationsView";
import CharactersView from "@views/CharactersView";
import EditGddForm from "@components/Forms/GddForm/EditGDDForm";
import { getGameplayAPI } from "@services/gameplayAPI";
import { createGameplay } from "@store/slices/gameplaySlice";
import { getGDDAPI } from "@services/gddAPI";
import { createGDD } from "@store/slices/gddSlice";

function GDDView() {
  const { selectedGDD } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGDDData = async () => {
      if (!selectedGDD) {
        return dispatch(
          showModal({
            text: "GDD was not found",
            activeModal: ActiveModal.Redirect,
          })
        );
      }

      try {
        const gddResponse = await getGDDAPI(selectedGDD);
        if (gddResponse.success) {
          const gameplayResponse = await getGameplayAPI(selectedGDD);
          if (gameplayResponse.success) {
            dispatch(createGDD(gddResponse.gdd));
            dispatch(createGameplay(gameplayResponse.gameplay));
          }
        }
      } catch (error) {
        console.error(error);
        dispatch(
          showModal({
            text: "GDD was not found",
            activeModal: ActiveModal.Redirect,
          })
        );
      }
    };

    fetchGDDData();
    console.log("fetching");
  }, [selectedGDD, dispatch]);
  return (
    <div className={gddStyle.container}>
      <Sidebar></Sidebar>
      <div></div>
      <div className={gddStyle.routes_container}>
        <Routes>
          <Route path="info" element={<GeneralInfo></GeneralInfo>} />
          <Route path="editGdd" element={<EditGddForm></EditGddForm>} />
          <Route path="mechanics/*" element={<MechanicsView />} />
          <Route path="gameplay" element={<GameplayView></GameplayView>} />
          <Route path="locations/*" element={<LocationsView></LocationsView>} />
          <Route
            path="characters/*"
            element={<CharactersView></CharactersView>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default GDDView;
