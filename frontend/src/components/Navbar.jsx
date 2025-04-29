import React from "react";
import { useNavigate, Link,useLocation } from "react-router-dom";
import { useUser } from "./UserContext";

const Navbar = ({ handleLogout, setShowModal }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const { user,loading } = useUser();
  if (loading) return null;
  // console.log("🔍 User in Navbar:", user);
 

  const navigateToFavorites = () => {
    navigate("/favorites");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <header className="flex justify-between items-center bg-lightPurple p-4 rounded-md shadow-md mb-6">
      <Link to="/allbooks">
        <h1 className="text-3xl font-semibold text-white">Library</h1>
      </Link>
      <nav className="flex items-center space-x-4">
        {user?.userInfo?.role === "admin" &&
          location.pathname === "/allbooks"
          && (
            <button
              className="bg-palePurple text-white px-6 py-2 rounded-md hover:bg-darkRose transition duration-300"
              onClick={() => setShowModal(true)}
            >
              Add Book
            </button>
          )}
        {user?.userInfo?.role === "user" &&
          location.pathname === "/allbooks"
          && (
            
            <button
              className="bg-purplle text-white px-6 py-2 rounded-md hover:bg-darkRose transition duration-300"
              onClick={navigateToFavorites}
            >
              Favorite Books
            </button>
          )}
        {user?.userInfo?.role === "user" &&
          location.pathname === "/favorites"
          && (
            <button
              className="bg-purplle text-white px-6 py-2 rounded-md hover:bg-darkRose transition duration-300"
              onClick={() => navigate("/allbooks")}
            >
              Return to All Books
            </button>
          )}
        {location.pathname === "/details/:id"
 && (
          <button
            onClick={() => navigate(-1)}
            className="bg-purplle text-white px-6 py-2 rounded-md hover:bg-darkRose transition duration-300"
          >
            Return
          </button>
        )}
        {!user && (
          <button
            onClick={navigateToRegister}
            className="bg-purplle text-white px-6 py-2 rounded-md hover:bg-darkRose transition duration-300"
          >
            Sign Up
          </button>
        )}

        {!user && (
          <button
            className="bg-darkRose text-white px-6 py-2 rounded-md hover:bg-purple transition duration-300"
            onClick={navigateToLogin}
          >
            Sign In
          </button>
        )}
        {user && (
          <button
            className="bg-darkRose text-white px-6 py-2 rounded-md hover:bg-purple transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
