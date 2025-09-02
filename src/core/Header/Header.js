import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, LogOut, PlusCircle, Settings, LogIn, UserPlus } from "lucide-react";
import apiService from "../../services/api";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const isAuth = apiService.isAuthenticated();
      const user = apiService.getUserData();

      setIsAuthenticated(isAuth);
      setUserData(user);
    };

    checkAuth();

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setIsAuthenticated(false);
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1>Help Yourself</h1>
          </Link>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>
        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-text">
                Welcome, {userData?.firstName || "User"}!
              </span>
              {userData?.role === "admin" && (
                <>
                  <button
                    className="btn-signup"
                    onClick={() => navigate("/create-job")}
                  >
                    <PlusCircle size={16} className="mr-2" />
                    Create Job
                  </button>
                  <button
                    className="btn-profile"
                    onClick={() => navigate("/admin")}
                  >
                    <Settings size={16} className="mr-2" />
                    Admin
                  </button>
                </>
              )}
              <button className="btn-profile" onClick={handleProfileClick}>
                <UserCircle size={16} className="mr-2" />
                Profile
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn-login" onClick={handleLoginClick}>
                <LogIn size={16} className="mr-2" />
                Login
              </button>
              <button className="btn-signup" onClick={handleSignupClick}>
                <UserPlus size={16} className="mr-2" />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
