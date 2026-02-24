import { NavLink } from "react-router-dom";
import { UI } from "@styles";

const pages = [
  { name: "Home", to: "/" },
  { name: "Goals", to: "/goals" },
  { name: "Info", to: "/info" },
  { name: "Settings", to: "/settings" },
];

export function Header() {
  const renderPageLink = (page) => {
    return (
      <li key={page.name}>
        <NavLink
          to={page.to}
          className={({ isActive }) => UI.NavItem(isActive && "navlink-active")}
        >
          {page.name}
        </NavLink>
      </li>
    );
  };

  return (
    <ul className={UI.Navbar()}>{pages.map((page) => renderPageLink(page))}</ul>
  );
}
