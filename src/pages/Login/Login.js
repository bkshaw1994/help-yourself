import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPageTitle } from "../../api/slices/uiSlice";
import Form from "../../components/Form";
import apiService from "../../services/api";
import { User, Building2, Check } from "lucide-react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("job-seeker");
  const [fieldErrors, setFieldErrors] = useState({});

  // Set page title
  useEffect(() => {
    dispatch(setPageTitle("Login - Help Yourself"));
  }, [dispatch]);

  // Handle signup success notification
  useEffect(() => {
    const signupSuccess = sessionStorage.getItem("signupSuccess");
    const signupMessage = sessionStorage.getItem("signupMessage");

    if (signupSuccess === "true" && signupMessage) {
      // Show the signup success message
      toast.success(signupMessage, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the stored messages
      sessionStorage.removeItem("signupSuccess");
      sessionStorage.removeItem("signupMessage");
    }
  }, []);

  // Handle role change to trigger form re-render
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const loginFormData = [
    {
      type: "input",
      inputType: "email",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
    },
    {
      type: "input",
      inputType: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
    {
      type: "checkbox",
      name: "rememberMe",
      label: "Remember me",
      defaultValue: false,
    },
    {
      type: "button",
      buttonType: "submit",
      label: isLoading ? "Logging in..." : "Login",
      className: "login-btn",
      disabled: isLoading,
    },
  ];

  const handleLoginSubmit = async (formData) => {
    console.log("Login form submitted:", formData);
    setError("");
    setFieldErrors({});
    setIsLoading(true);

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
        requestedRole: selectedRole, // Send requested role
      };

      const { data } = await apiService.login(loginData);

      // Check if user is trying to access job poster but doesn't have job poster or admin role
      if (
        selectedRole === "job-poster" &&
        data.user.role !== "job-poster" &&
        data.user.role !== "admin"
      ) {
        setError("Access denied. You don't have Job Poster privileges.");
        setIsLoading(false);
        return;
      }

      // Check if user is admin but approval is pending
      if (
        data.user.role === "admin" &&
        data.user.adminApprovalStatus !== "approved"
      ) {
        setError(
          `Admin approval is ${
            data.user.adminApprovalStatus || "pending"
          }. Please contact an administrator for approval.`
        );
        setIsLoading(false);
        return;
      }

      // Check if user is trying to access as job seeker but has job poster role
      if (
        selectedRole === "job-seeker" &&
        (data.user.role === "admin" || data.user.role === "job-poster")
      ) {
        setError("Please use Job Poster login for Job Poster accounts.");
        setIsLoading(false);
        return;
      }

      // Store the JWT token and user data
      apiService.setAuthToken(data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      // Show welcome message with role-specific dashboard info
      let dashboardMessage = "";
      let redirectPath = "/";

      if (data.user.role === "admin" || data.user.role === "job-poster") {
        dashboardMessage = `Welcome back, ${data.user.firstName}! Redirecting to your job dashboard...`;
        redirectPath = "/post-job"; // Job dashboard for job posters/admins
      } else if (data.user.role === "job-seeker" || data.user.role === "user") {
        dashboardMessage = `Welcome back, ${data.user.firstName}! Redirecting to your profile...`;
        redirectPath = "/profile"; // Profile page for job seekers/users
      } else {
        dashboardMessage = `Welcome back, ${data.user.firstName}!`;
        redirectPath = "/"; // Home page as fallback
      }

      // Show success toast
      toast.success(dashboardMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate to appropriate dashboard
      navigate(redirectPath);
    } catch (error) {
      console.error("Login error:", error);

      // If it's an authentication error, don't show field errors, just top-level error
      if (
        error.message &&
        (error.message.includes("Invalid email or password") ||
          error.message.includes("authentication failed") ||
          error.message.includes("password"))
      ) {
        // Clear any existing field errors and only show top-level error
        setFieldErrors({});
        setError("Invalid credentials. Please check your email and password.");
      } else {
        setError(error.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Tabs at the top */}
        <div className="container-header">
          <div className="account-type-tabs">
            <button
              type="button"
              className={`tab-button ${
                selectedRole === "job-seeker" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("job-seeker")}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`tab-button ${
                selectedRole === "job-poster" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("job-poster")}
            >
              Job Poster
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="container-content">
          {/* Left Side - Details */}
          <div className="login-details">
            <div className="details-content">
              {selectedRole === "job-seeker" ? (
                <div className="role-details">
                  <div className="role-icon"><User size={32} /></div>
                  <h2>Job Seeker</h2>
                  <p>Find your dream job and advance your career</p>
                  <ul className="role-features">
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Browse thousands of job listings</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Apply to jobs with one click</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Track your application status</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Get job recommendations</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Build your professional profile</li>
                  </ul>
                </div>
              ) : (
                <div className="role-details">
                  <div className="role-icon"><Building2 size={32} /></div>
                  <h2>Job Poster</h2>
                  <p>Find the perfect candidates for your company</p>
                  <ul className="role-features">
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Post unlimited job listings</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Manage applicant screening</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Access candidate profiles</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Analytics and insights</li>
                    <li><Check size={16} style={{display: 'inline', marginRight: '8px'}} /> Team collaboration tools</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="login-form-section">
            <div className="login-form-content">
              <div className="login-header">
                <h1>Welcome Back</h1>
                <p>Please sign in to your account</p>

                {error && (
                  <div
                    className="top-error-message"
                    style={{
                      color: "#dc3545",
                      backgroundColor: "#f8d7da",
                      border: "1px solid #f5c6cb",
                      borderRadius: "4px",
                      padding: "12px",
                      marginTop: "15px",
                      marginBottom: "10px",
                      fontSize: "14px",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    {error}
                  </div>
                )}
              </div>

              <Form
                data={loginFormData}
                title=""
                onSubmit={handleLoginSubmit}
                fieldErrors={fieldErrors}
              />

              <div className="login-footer">
                <div className="forgot-password">
                  <Link to="/forgot-password" className="link">
                    Forgot your password?
                  </Link>
                </div>

                <div className="signup-link">
                  <span>Don't have an account? </span>
                  <Link to="/signup" className="link">
                    Sign up here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
