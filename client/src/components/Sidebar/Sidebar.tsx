import { useState } from "react";
import * as sidebarStyle from "@styles/modules/sidebar.module.scss";
import * as buttonStyle from "@styles/modules/button.module.scss";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("General Info");

  const navigate = useNavigate();

  function handleNavigate(route: string) {
    navigate(route);
  }

  return (
    <div className={sidebarStyle.sidebar}>
      <h3>Components</h3>
      <ul>
        <li>
          <span onClick={() => handleNavigate("info")}>Overview</span>
        </li>

        <li>
          <span onClick={() => handleNavigate("gameplay")}>Gameplay</span>
        </li>
        <li>
          <span onClick={() => handleNavigate("mechanics")}>Mechanics</span>
          <button
            onClick={() => handleNavigate("mechanics/new")}
            className={buttonStyle.create_btn}
            style={{
              padding: "5px 10px",
              position: "absolute",
              right: "5px",
              top: "8px",
            }}
          >
            +
          </button>
        </li>
        <li>
          <span onClick={() => handleNavigate("locations")}>Locations</span>
          <button
            onClick={() => handleNavigate("locations/new")}
            className={buttonStyle.create_btn}
            style={{
              padding: "5px 10px",
              position: "absolute",
              right: "5px",
              top: "8px",
            }}
          >
            +
          </button>
        </li>
        <li>
          <span onClick={() => handleNavigate("characters")}>Characters </span>
          <button
            onClick={() => handleNavigate("mechanics/new")}
            className={buttonStyle.create_btn}
            style={{
              padding: "5px 10px",
              position: "absolute",
              right: "5px",
              top: "8px",
            }}
          >
            +
          </button>
        </li>
      </ul>
    </div>
  );
}
