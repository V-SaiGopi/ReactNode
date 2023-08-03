import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { toast } from "react-toastify";


const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const { username, password } = data;

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const formSubmitter = async (e) => {
        e.preventDefault();

        // Validate user ID
        if (!isValidUserId(username)) {
            setError("Please enter a valid user ID");
            return;
        }

        // Validate password
        if (!isValidPassword(password)) {
            setError(
                "Password should have a minimum of 8 characters with a combination of uppercase, lowercase, numbers, and special characters"
            );
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // Successful login
                navigate("/user");
                toast.success("Logined successfully.");
                console.log("Login successful");
            } else {
                // Failed login
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred");
        }
    };

    const isValidUserId = (userId) => {
        return userId != null && userId.trim() !== "";
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

    return (
        <div>
            <h1 className="fixed-top">Employee Management System</h1>
            <div className="context">
                <div className="contain">
                    <div className="form-login">
                        <form className="login" onSubmit={formSubmitter}>
                            <div className="login-header">
                                <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                                <h1>Login</h1>
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
                                    name="username"
                                    placeholder="Username"
                                    id="username"
                                    value={username}
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
                            <div className="forgot-password-link">
                                <Link to="/forgotpassword" className="link">
                                    Forgot password?
                                </Link>
                            </div>
                            <br />
                            <button
                                className="text-decoration-none btn btn-sm btn-light"
                                type="submit"
                                style={{height: "35px"}}
                            >
                                Submit
                            </button>
                            <div className="signup-link">
                                Don't have an account?{" "}
                                <Link to="/signup" className="link">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
