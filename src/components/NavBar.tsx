import { FunctionComponent, useContext } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";

import { GlobalProps } from "../App";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { currentUser, isDarkMode, setIsDarkMode } = useContext(GlobalProps);

  const navigate: NavigateFunction = useNavigate();
  function handleDark() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary text-light"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink
            className="navbar-brand text-info text-light-emphasis"
            to="/"
          >
            NEXCRM
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/about">
                    ABOUT
                  </NavLink>
                </li>
                {/* <li>
                <NavLink className="nav-link" aria-current="page" to="/">
                  ALL CARDS
                </NavLink>
              </li> */}
                <li>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/favcards"
                  >
                    FAV CARDS
                  </NavLink>
                </li>
                {currentUser?.isBusiness && (
                  <li>
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/mycards"
                    >
                      MY CARDS
                    </NavLink>
                  </li>
                )}
                {currentUser?.isAdmin && (
                  <li>
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/sandbox"
                    >
                      SANDBOX
                    </NavLink>
                  </li>
                )}
              </ul>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 text-light"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  // onClick={()=>{alert("Search functionality not implemented yet")}}
                  onChange={() => {
                    alert("Search functionality not implemented yet");
                  }}
                />
              </form>
              {isDarkMode ? (
                <i
                  className="fa-solid fa-moon"
                  onClick={() => handleDark()}
                ></i>
              ) : (
                <i className="fa-solid fa-sun" onClick={() => handleDark()}></i>
              )}

              {/* <form className="d-flex" role="search">
                <button
                  className="btn btn-outline-info"
                  type="submit"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("userId");
                  }}
                >
                  Logout
                </button>
              </form> */}
            </>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
