import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as table_style from "@styles/modules/table.module.scss";
import * as button_style from "@styles/modules/button.module.scss";
import { GameLocation } from "@_types/gddTypes";
import LocationImage from "@components/Images/LocationImage";
import { deleteLocation } from "@store/slices/locationsSlice";
import { useHandleEmptyList } from "@hooks/useHandleEmptyList";

export default function LocationsTable() {
  const locations = useSelector(
    (state: RootState) => state.locationsSlice.locations
  );

  const navigate = useNavigate();
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
    <table className={table_style.table}>
      <thead>
        <tr>
          <th>NAME</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {sortedLocations.map((location: GameLocation) => (
          <tr key={location.id}>
            <td style={{ height: "150px" }}>
              <div
                style={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "200px 100px",
                  gap: 20,
                }}
              >
                {location.mainImage.id.length > 0 ? (
                  <LocationImage
                    path={location.mainImage.path}
                    alt={"main image"}
                    width="200px"
                  ></LocationImage>
                ) : (
                  <span style={{ fontSize: "1.7rem", color: "grey" }}>
                    no image
                  </span>
                )}

                <span>{location.name}</span>
              </div>
            </td>
            <td
              style={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                width: "auto",
                justifyContent: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <button
                className={button_style.create_btn}
                onClick={() => navigate(`${location.id}`)}
              >
                Edit
              </button>
              <button
                className={button_style.cancel_btn}
                onClick={() => {
                  handleLocationDelete(location.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
