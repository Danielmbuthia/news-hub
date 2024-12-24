import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/userContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useContext(UserContext);
  return (
    <header className="relative">
      <nav>
        <div className="flex items-center justify-between w-full">
          <div>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/articles" className="nav-link">
              Articles
            </NavLink>
          </div>

          {/* Hamburger menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-200 hover:bg-slate-700 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden lg:flex space-x-4">
            {user && user?.id ? (
              <>
                <NavLink to="/preferences" className="nav-link block py-3 px-4">
                  Preferences
                </NavLink>
                <NavLink to="/feeds" className="nav-link block py-3 px-4">
                  Feed
                </NavLink>
                <NavLink to="/logout" className="nav-link block py-3 px-4">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" className="nav-link block py-3 px-4">
                  Register
                </NavLink>
                <NavLink to="/login" className="nav-link block py-3 px-4">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:hidden absolute top-full left-0 right-0 flex-col bg-slate-800 w-full border-t border-slate-700`}
        >
          {user && user?.id ? (
            <>
              <NavLink to="/#" className="nav-link block py-3 px-4">
                Preferences
              </NavLink>
              <NavLink to="/#" className="nav-link block py-3 px-4">
                Feed
              </NavLink>
              <NavLink to="/logout" className="nav-link block py-3 px-4">
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register" className="nav-link block py-3 px-4">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link block py-3 px-4">
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
