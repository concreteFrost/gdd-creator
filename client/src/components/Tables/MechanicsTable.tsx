import React, { memo } from "react";
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

  console.log("rendering children");

  if (group.mechanics.length === 0) return;

  return (
    <>
      <div className="mechanics-section">
        <h3>{group.type.type.toUpperCase()}</h3> {/* Название типа механик */}
        {/* Если есть механики для этого типа, отображаем таблицу */}
        <table className={table_style.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
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
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <button
                    className={button_style.create_btn}
                    // onClick={() => navigate(`edit/${mechanic.id}`)}
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
      </div>
    </>
  );
}

export default memo(MechanicsTable);
