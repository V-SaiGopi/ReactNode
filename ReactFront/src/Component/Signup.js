import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { username, email, password, confirmPassword } = data;

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const isValidUserId = (userId) => {
    return userId != null && userId.trim() !== "";
  };

  const isValidEmail = (email) => {
    return email != null && email.trim() !== "" && email.includes("@");
  };

  const isValidPassword = (password) => {
    return (
      password != null &&
      password.trim().length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const formSubmitter = async (e) => {
    e.preventDefault();

    // Validate user ID
    if (!isValidUserId(username)) {
      setError("Please enter a valid user ID");
      return;
    }

    if (!isValidEmail(email)) {
        setError("Please enter a valid email");
        return;
    }

    // Validate password
    if (!isValidPassword(password)) {
      setError(
        "Password should have a minimum of 8 characters with a combination of uppercase, lowercase, numbers, and special characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        // Successful signup
        navigate("/");
        toast.success("User Registered successfully.");
      } else {
        // Failed signup
        setError("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };

  return (
    <>
      <h1 className="fixed-top">Employee Management System</h1>
      <div className="context">
        <div className="contain">
          <div className="form-signup">
            <form className="signup" onSubmit={formSubmitter}>
              <div className="signup-header">
                <FontAwesomeIcon icon={faUserPlus} className="user-icon" />
                <h1>Sign up</h1>
              </div>
              <br />
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
                  name="username"
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <br />
              <button
                className="text-decoration-none btn btn-sm btn-light"
                type="submit"
                style={{height: "35px"}}
              >
                Sign up
              </button>
              <div className="login-link">
                Already have an account?{" "}
                <Link to="/" className="link">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;


