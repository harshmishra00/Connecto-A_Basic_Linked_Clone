import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const activeClass = "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition";
  const inactiveClass = "text-gray-700 hover:text-blue-600 font-medium transition";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="w-32 h-auto object-contain"
            src="https://i.postimg.cc/cCtpxKgt/Chat-GPT-Image-Nov-6-2025-12-25-57-AM-1.png"
            alt="Connecto Logo"
          />
          
        </Link>

        <div className="flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Home
          </NavLink>

          {token && (
            <NavLink to="/create" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Create Post
            </NavLink>
          )}

          <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            About
          </NavLink>

          {token ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium hover:bg-blue-700 transition"
              >
                <span>{username || "User"}</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-md">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
