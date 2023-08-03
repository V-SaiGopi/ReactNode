import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if the email is present in the database
    // Replace the API endpoint and modify the request as per your server implementation
    try {
      const response = await fetch("http://localhost:8080/api/checkemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Email is verified
        setIsEmailVerified(true);
        setError("");
      } else {
        // Email not found in the database
        setIsEmailVerified(false);
        setError("Email not found please Signup!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(newPassword)) {
      setError(
        "Password should have a minimum of 8 characters with a combination of uppercase, lowercase, numbers, and special characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send a request to the server to update the password for the specific email
      const response = await fetch("http://localhost:8080/api/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        // Password update successful
        navigate("/");
        toast.success("Password updated successfully");
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setIsEmailVerified(false);
      } else {
        // Failed to update password
        setError("Failed to update password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (newPassword) => {
    return (
      newPassword != null &&
      newPassword.trim().length >= 8 &&
      /[a-z]/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      /\d/.test(newPassword) &&
      /[!@#$%^&*]/.test(newPassword)
    );
  };

  return (
    <>
      <h1 className="fixed-top">Employee Management System</h1>
      <div className="context">
        <div className="contain">
          <div className="form-login">
            <form className="login" onSubmit={isEmailVerified ? handlePasswordSubmit : handleSubmit}>
              <div className="login-header">
                <FontAwesomeIcon icon={faLock} className="user-icon" />
                <h1>{isEmailVerified ? "Reset Password" : "Forgot Password"}</h1>
              </div><br />
              {error && (
                <div
                  style={{ marginBottom: "10px", color: "red" }}
                  className="error"
                >
                  {error}
                </div>
              )}
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {isEmailVerified && <FontAwesomeIcon icon={faCheck} style={{ fontSize: "28px", color:"green"}} />}
              </div>
              {isEmailVerified && (
                <>
                  <div className="input-field">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <br />
              <button
                className="text-decoration-none btn btn-sm btn-light"
                type="submit"
                style={{height: "35px"}}
              >
                {isEmailVerified ? "Submit" : "Reset Password"}
              </button>
              <div className="login-link">
                Remember your password?{" "}
                <Link to="/" className="link">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;