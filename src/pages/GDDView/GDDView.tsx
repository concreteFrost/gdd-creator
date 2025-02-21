import Sidebar from "@components/Sidebar/Sidebar";
import * as gddStyle from "./GDDView.module.scss";
import { Route, Routes } from "react-router-dom";
import GeneralInfo from "@views/Overview";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { ActiveModal, ModalState, showModal } from "@store/slices/modalSlice";
import MechanicsView from "@views/MechanicsView";
import GameplayView from "@views/GameplayView";
import LocationsView from "@views/LocationsView";
import CharactersView from "@views/CharactersView";
import EditGddForm from "@components/Forms/GddForm/EditGDDForm";
import { getGameplayAPI } from "@services/gameplayAPI";
import { createGameplay, editGameplay } from "@store/slices/gameplaySlice";
import { getGDDAPI } from "@services/gddAPI";
import { createGDD } from "@store/slices/gddSlice";
import { getAllMechanicsAPI } from "@services/mechanicsAPI";
import {
  Character,
  GameLocation,
  GameMechanic,
  MechanicType,
} from "@_types/gddTypes";
import { addMechanic } from "@store/slices/mechanicsSlice";
import { getAllTypesAPI } from "@services/mechanicsTypesAPI";
import { addMechanicType } from "@store/slices/mechanicsTypeSlice";
import { getAllCharactersAPI } from "@services/charactersAPI";
import { addCharacter } from "@store/slices/characterSlices";
import { getAllLocationsAPI } from "@services/locationsAPI";
import { addLocation } from "@store/slices/locationsSlice";
import { setLoading } from "@store/slices/loaderSlice";

function GDDView() {
  const { selectedGDD } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();

  const fetchAll = async () => {
    if (!selectedGDD) {
      dispatch(
        showModal({
          text: "GDD was not found",
          activeModal: ActiveModal.Redirect,
        })
      );
      return;
    }

    try {
      // Запускаем запросы параллельно
      dispatch(setLoading(true));
      const [
        gddResponse,
        gameplayResponse,
        mechanicsResponse,
        allTypesResponse,
        allCharactersResponse,
        allLocationsResponse,
      ] = await Promise.all([
        getGDDAPI(selectedGDD),
        getGameplayAPI(selectedGDD),
        getAllMechanicsAPI(selectedGDD),
        getAllTypesAPI(selectedGDD),
        getAllCharactersAPI(selectedGDD),
        getAllLocationsAPI(selectedGDD),
      ]);

      if (gddResponse.success) dispatch(createGDD(gddResponse.gdd));
      if (gameplayResponse.success) {
        dispatch(editGameplay(gameplayResponse.gameplay));
      }

      if (mechanicsResponse.success) {
        const allMechanics = mechanicsResponse.mechanics;
        if (allMechanics.length > 0)
          allMechanics.forEach((m: GameMechanic) => {
            dispatch(addMechanic(m));
          });
      }
      if (allTypesResponse.success) {
        const allTypes = allTypesResponse.types;
        if (allTypes.length > 0)
          allTypes.forEach((t: MechanicType) => dispatch(addMechanicType(t)));
      }

      if (allCharactersResponse.success) {
        const allCharacters = allCharactersResponse.characters;
        if (allCharacters.length > 0)
          allCharacters.forEach((c: Character) => dispatch(addCharacter(c)));
      }

      if (allLocationsResponse.success) {
        const allLocations = allLocationsResponse.locations;
        console.log(allLocations);
        if (allLocations.length > 0)
          allLocations.forEach((l: GameLocation) => dispatch(addLocation(l)));
      }
    } catch (error) {
      dispatch(
        showModal({
          text: "Failed to load GDD data",
          activeModal: ActiveModal.Redirect,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useLayoutEffect(() => {
    if (selectedGDD) fetchAll();
  }, [selectedGDD]);

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
