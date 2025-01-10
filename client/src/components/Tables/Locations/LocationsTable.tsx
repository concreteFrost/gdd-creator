import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocation } from "@store/slices/locationsSlice";
import { useHandleEmptyList } from "@hooks/useHandleEmptyList";
import TableWithImages from "../TableWithImages";

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

  function handleLocationDelete(id: string) {
    dispatch(deleteLocation(id));
  }

  return (
    <TableWithImages
      data={sortedLocations}
      handleDeteleItem={handleLocationDelete}
    ></TableWithImages>
  );
}
