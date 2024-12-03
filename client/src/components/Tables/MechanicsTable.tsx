import React, { memo, useState } from "react";
import * as table_style from "@styles/modules/table.module.scss";
import * as button_style from "@styles/modules/button.module.scss";
import { GroupedMechanics } from "@_types/gddTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMechanic } from "@store/slices/mechanicsSlice";

interface MechanicsTableProps {
  group: GroupedMechanics;
}

function MechanicsTable({ group }: MechanicsTableProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState<boolean>(true);

  if (group.mechanics.length === 0) return;

  return (
    <>
      <div style={{ position: "relative" }}>
        <h3 style={{ paddingLeft: "10px", marginBottom: "30px" }}>
          {group.type.type.toUpperCase()}
        </h3>{" "}
        <button
          style={{ position: "absolute", top: 0, left: 250 }}
          onClick={() => setExpanded(!isExpanded)}
        >
          {">"}
        </button>
        {isExpanded ? (
          <table className={table_style.table}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {group.mechanics.map((mechanic) => (
                <tr key={mechanic.id}>
                  <td>{mechanic.name}</td>
                  <td
                    style={{
                      display: "flex",
                      width: "auto",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <button
                      className={button_style.create_btn}
                      onClick={() => navigate(`${mechanic.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={button_style.cancel_btn}
                      onClick={() => {
                        dispatch(deleteMechanic(mechanic.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}

export default memo(MechanicsTable);
