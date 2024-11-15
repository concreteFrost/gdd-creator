import { useState } from "react";
import * as sidebarStyle from "@styles/modules/sidebar.module.scss";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
  name: string;
  route: string;
}

const items: SidebarItem[] = [
  {
    name: "General Info",
    route: "info",
  },
  {
    name: "Mechanics",
    route: "mechanics",
  },
  {
    name: "Gameplay",
    route: "gameplay",
  },
  {
    name: "Locations",
    route: "locations",
  },
  {
    name: "Characters",
    route: "characters",
  },
];

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
        {Object.entries(items).map(([obj, value]) => (
          <li
            key={value.name}
            className={activeItem === value.name ? "active" : ""}
            onClick={() => {
              setActiveItem(value.name);
              handleNavigate(value.route);
            }}
          >
            {value.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
