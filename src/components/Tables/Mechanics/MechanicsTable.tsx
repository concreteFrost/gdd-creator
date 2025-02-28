import { memo, useState } from "react";
import * as table_style from "../Table.module.scss";
import * as button_style from "@components/Buttons/Button.module.scss";
import { GameMechanic, GroupedMechanics } from "@_types/gddTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMechanic, addMechanic } from "@store/slices/mechanicsSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { tableTranslator } from "../localisation/tableTranslator";
import { icons } from "@assets/icons";
import { createMechanicAPI, deleteMechanicAPI } from "@services/mechanicsAPI";
import { showModal } from "@store/slices/modalSlice";
import { ActiveModal } from "@store/slices/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { setLoading } from "@store/slices/loaderSlice";

interface MechanicsTableProps {
  group: GroupedMechanics;
}

function MechanicsTable({ group }: MechanicsTableProps) {
  if (group.mechanics.length === 0) return null;

  const currentLang = useCurrentLanguage();
  const loc = tableTranslator[currentLang];
  const { id: gddId } = useSelector((state: RootState) => state.gddSlice.gdd);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState<boolean>(true);

  async function handleMechanicDelete(id: string) {
    try {
      const res = await deleteMechanicAPI(id);

      if (res.data.success) {
        dispatch(deleteMechanic(id));
        return;
      }

      dispatch(
        showModal({ activeModal: ActiveModal.Info, text: res.data.message })
      );
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    }
  }

  async function handleCreateDuplicate(mechanic: GameMechanic) {
    dispatch(setLoading(true));
    try {
      const res = await createMechanicAPI({ ...mechanic, gdd_id: gddId });

      if (res.success) {
        dispatch(addMechanic(res.mechanic));
      }
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div className={table_style.table_wrapper}>
      <h3 className={table_style.section_header}>
        {group.type.type.toUpperCase()}
      </h3>{" "}
      <button
        className={`${button_style.create_btn} ${table_style.section_toggle_button}`}
        onClick={() => setExpanded(!isExpanded)}
      >
        {isExpanded ? icons.up : icons.down}
      </button>
      {isExpanded ? (
        <table className={table_style.table}>
          <thead>
            <tr>
              <th>{loc.nameHeader}</th>
              <th>{loc.actionHeader}</th>
            </tr>
          </thead>
          <tbody>
            {group.mechanics.map((mechanic) => (
              <tr key={mechanic.id}>
                <td>{mechanic.name}</td>
                <td className={table_style.actions_row}>
                  <button
                    className={button_style.create_btn}
                    onClick={() => navigate(`${mechanic.id}`)}
                  >
                    {icons.edit}
                  </button>
                  <button
                    className={button_style.cancel_btn}
                    onClick={() => handleCreateDuplicate(mechanic)}
                  >
                    {icons.copy}
                  </button>
                  <button
                    className={button_style.delete_btn}
                    onClick={() => {
                      handleMechanicDelete(mechanic.id);
                    }}
                  >
                    {icons.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default memo(MechanicsTable);
