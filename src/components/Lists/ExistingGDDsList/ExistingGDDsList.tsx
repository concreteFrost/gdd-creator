import { GDD } from "@_types/gddTypes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteGDDAPI, getAllGDDAPI } from "@services/gddAPI";
import * as styles from "./ExistingGDDsList.module.scss";
import { useDispatch } from "react-redux";
import { setSelectedGDD } from "@store/slices/authSlice";
import { icons } from "@assets/icons";
import { ActiveModal, showModal } from "@store/slices/modalSlice";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddListTranslator } from "./localisation/gddListTranslator";

export default function ExistingGDDsList() {
  const [gddList, setGddList] = useState<Array<GDD>>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLang = useCurrentLanguage();
  const loc = gddListTranslator[currentLang];

  useEffect(() => {
    const fetchGDDList = async () => {
      try {
        const response = await getAllGDDAPI();

        if (response.success) {
          setGddList(response.gdd);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGDDList();
  }, []);

  const handleDeleteGDD = async (id: string) => {
    try {
      const response = await deleteGDDAPI(id);

      console.log(response);
      if (response.success) {
        const filtered = gddList.filter((g: GDD) => g.id !== id);
        setGddList(filtered);
      }
    } catch (error: any) {
      dispatch(showModal({ activeModal: ActiveModal.Info, text: error }));
      console.log(error);
    }
  };

  function handleEditButtonClick(id: string) {
    dispatch(setSelectedGDD(id));
    navigate("/gdd/info");
  }

  return (
    <div className={styles.list_wrapper}>
      <div className={styles.modal_header}>{loc.header}</div>
      {gddList.length > 0 ? (
        <ul>
          {gddList.map((gdd: GDD) => (
            <li key={gdd.id}>
              <span>{gdd.title}</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className={styles.edit_button}
                  onClick={() => handleEditButtonClick(gdd.id)}
                >
                  {icons.edit}
                </button>
                <button onClick={() => handleDeleteGDD(gdd.id)}>
                  {icons.delete}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>{loc.emptyListMessage}</span>
      )}
    </div>
  );
}
