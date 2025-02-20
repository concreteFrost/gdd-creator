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

export default function LocationsTable() {
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

  function handleDup(item: any) {
    dispatch(duplicateLocation(item));
  }

  return (
    <TableWithImages
      data={sortedLocations}
      handleDeteleItem={handleLocationDelete}
      handleDup={handleDup}
    ></TableWithImages>
  );
}
