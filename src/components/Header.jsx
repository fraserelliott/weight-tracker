import { NavLink } from "react-router-dom";
import { UI } from "@styles";
import logo from "../assets/logo.png";

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
    <div className="fe-d-flex fe-justify-between bg-secondary fe-items-center fe-w-100 box-shadow-subtle">
      <img src={logo} alt="Logo" className="fe-p-em-1 logo" />
      <ul className={UI.Navbar()}>
        {pages.map((page) => renderPageLink(page))}
      </ul>
      <div></div>
    </div>
  );
}
