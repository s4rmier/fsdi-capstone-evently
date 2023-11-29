import { Link, useLocation } from "react-router-dom";
import "./header.css";
import NavLink from "./NavLink";

function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="container flex-row align">
        <div className="right-col flex-row align">
          <Link to="/">
            <div className="brand-container flex-row align">
              <img className="brand-img" src="/logo.svg" alt="" />
              <h2 className="brand-name">Evently</h2>
            </div>
          </Link>

          <nav>
            <ul className="flex-row">
              <NavLink
                isActiveNav={location.pathname === "/"}
                name={"Home"}
                url={""}
              />
              <NavLink
                isActiveNav={location.pathname.startsWith("/blog")}
                name={"Blog"}
                url={"blog"}
              />
              <NavLink
                isActiveNav={location.pathname.startsWith("/events")}
                name={"Events"}
                url={"events"}
              />
              <NavLink
                isActiveNav={location.pathname === "/contact"}
                name={"Contact"}
                url={""}
              />
            </ul>
          </nav>
        </div>

        <div className="left-col">
          <div className="nav-actions flex-row align">
            <button id="nav-get-started" className="button btn-spec">
              Get Started<i className="fa-solid fa-arrow-right-long"></i>
            </button>
            <button id="nav-sign-in" className="button">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
