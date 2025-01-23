import { useState } from "react";
import * as sidebarStyle from "./Sidebar.module.scss";
import * as buttonStyle from "@components/Buttons/Button.module.scss";
import { useNavigate } from "react-router-dom";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { sidebarTranslator } from "./localisation/sidebarTranslator";
import { icons } from "@assets/icons";
import NavigateButton from "@components/Buttons/NavigateButton/NavigateButton";
import { closeGDD } from "@store/slices/gddSlice";
import { setSelectedGDD } from "@store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("General Info");
  const navigate = useNavigate();
  const currentLanguage = useCurrentLanguage();
  const dispatch = useDispatch();
  const loc = sidebarTranslator[currentLanguage];

  function handleNavigate(route: string) {
    navigate(route);
  }

  function handleExitButtonClick() {
    dispatch(setSelectedGDD(null));
    dispatch(closeGDD());
    navigate("/");
  }

  return (
    <div className={sidebarStyle.sidebar}>
      <ul>
        <li>
          <span onClick={() => handleNavigate("editGdd")}>{loc.general}</span>
        </li>
        <li>
          <span onClick={() => handleNavigate("gameplay")}>{loc.gameplay}</span>
        </li>
        <li>
          <span onClick={() => handleNavigate("mechanics")}>
            {loc.mechanics}
          </span>
          <NavigateButton route="mechanics/new" icon={icons.plus} />
        </li>
        <li>
          <span onClick={() => handleNavigate("locations")}>
            {loc.locations}
          </span>
          <NavigateButton route="locations/new" icon={icons.plus} />
        </li>
        <li>
          <span onClick={() => handleNavigate("characters")}>
            {loc.characters}{" "}
          </span>
          <NavigateButton route="characters/new" icon={icons.plus} />
        </li>
        <li>
          <span onClick={() => handleNavigate("info")}>{loc.output}</span>
        </li>
      </ul>

      <div className={sidebarStyle.button_wrapper}>
        <button
          className={sidebarStyle.go_back_button}
          onClick={handleExitButtonClick}
        >
          {icons.exit}
        </button>
      </div>
    </div>
  );
}
