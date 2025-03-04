import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocation,
  duplicateLocation,
} from "@store/slices/locationsSlice";
import { useHandleEmptyList } from "@hooks/useHandleEmptyList";
import TableWithImages from "../TableWithImages";
import { deleteLocationAPI } from "@services/locationsAPI";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { GameLocation, Character } from "@_types/gddTypes";
import withConfirmationModal from "@components/_hoc/withConfirmationModal";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { tableTranslator } from "../localisation/tableTranslator";

interface LocationsTableProps {
  showConfirmationModal?: (text: string, callback: () => void) => void;
}

function LocationsTable({ showConfirmationModal }: LocationsTableProps) {
  const currentLang = useCurrentLanguage();
  const loc = tableTranslator[currentLang];

  const locations = useSelector(
    (state: RootState) => state.locationsSlice.locations
  );

  const dispatch = useDispatch();

  const emptyLocationsHandler = useHandleEmptyList({ data: locations });
  if (emptyLocationsHandler) return emptyLocationsHandler;

  const sortedLocations = [...locations].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  async function handleLocationDelete(id: string) {
    try {
      const res = await deleteLocationAPI(id);

      if (res.success) {
        dispatch(deleteLocation(id));
        return;
      }

      dispatch(showModal({ activeModal: ActiveModal.Info, text: res.message }));
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    }
  }

  async function handleDeleteButtonClick(location: Character | GameLocation) {
    if (!showConfirmationModal) return;

    showConfirmationModal(loc.onDeleteMessage(location.name), () =>
      handleLocationDelete(location.id)
    );
  }

  function handleDup(item: any) {
    dispatch(duplicateLocation(item));
  }

  return (
    <TableWithImages
      data={sortedLocations}
      handleDeteleItem={handleDeleteButtonClick}
      handleDup={handleDup}
      loc={loc}
    ></TableWithImages>
  );
}

export default withConfirmationModal(LocationsTable);
