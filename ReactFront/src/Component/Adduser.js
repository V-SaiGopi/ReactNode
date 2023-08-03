import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddUser } from "../Redux/Action";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Adduser = () => {
  const [name, namechange] = useState("");
  const [sex, sexchange] = useState("");
  const [dob, dobchange] = useState("");
  const [salary, salarychange] = useState("");
  const [department, departmentchange] = useState("");
  const [image, setImage] = useState(""); // Added image state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { name, sex, dob, salary, department, image }; // Added image to user object
    dispatch(FunctionAddUser(userobj));
    navigate("/user");
  };

  const logout = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to Logout?")) {
      navigate("/");
      toast.success("Logout successfully");
      // window.location.reload();
    }
  };

  const handleReset = () => {
    namechange("");
    sexchange("");
    dobchange("");
    salarychange("");
    departmentchange("");
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      setImage(base64String);
    };
  
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };  

  const renderUserImage = () => {
    if (image) {
      return (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="User"
          className="user-image"
        />
      );
    }
    return null;
  };

  return (
    <>
      <h1 className="fixed-top">Employee Management System</h1>
      <div className="dash-contents">
        <div className="container">
          <div
            className="btn-group btn-group-lg d-flex gap-2 w-3"
            role="group"
            aria-label="..."
          >
            <button type="button" className="btn btn-light btn-circle" onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} className="edit-icon" />
            </button>
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={() => navigate("/user")}
            >
              Employees
            </button>
            <button type="button" className="btn btn-light w-100">
              Edit
            </button>
            <button type="button" className="btn btn-primary w-100 active">
              Add
            </button>
            <button type="button" className="btn btn-light w-100" onClick={logout}>
              Log Out
            </button>
          </div>
          <br />
          <form
            className="form-div"
            onSubmit={handlesubmit}
            style={{ backgroundColor: "white" }}
          >
            <div
              className="card-header d-flex"
              style={{ textAlign: "center", backgroundColor: "lightgrey" }}
            >
              <h2>Add User</h2>
            </div>
            <br />
            <div className="d-flex" style={{ textAlign: "left" }}>
              <div className="row w-50">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>Name</label>
                    <input
                      placeholder="Enter Name"
                      value={name || ""}
                      onChange={(e) => namechange(e.target.value)}
                      className="form-control"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Sex</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="sex"
                          value="M"
                          checked={sex === "M"}
                          onChange={(e) => sexchange(e.target.value)}
                          required
                        />
                        M
                      </label>
                      <label style={{ marginLeft: "20px" }}>
                        <input
                          type="radio"
                          name="sex"
                          value="F"
                          checked={sex === "F"}
                          onChange={(e) => sexchange(e.target.value)}
                        />
                        F
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>DOB</label>
                    <input
                      type="date"
                      value={dob || ""}
                      onChange={(e) => dobchange(e.target.value)}
                      className="form-control"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      value={salary || ""}
                      placeholder="Enter Salary"
                      onChange={(e) => salarychange(e.target.value)}
                      className="form-control"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={department || ""}
                      onChange={(e) => departmentchange(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value={""}>None</option>
                      <option value={"HR"}>HR</option>
                      <option value={"Sales"}>Sales</option>
                      <option value={"Accounts"}>Accounts</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                      required
                    />
                    {renderUserImage()}
                    <small className="form-text text-muted">Upload a profile picture for the user.</small>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card-footer"
              style={{ textAlign: "center", backgroundColor: "lightgrey" }}
            >
              <button className="btn btn-primary" type="submit">
                Submit
              </button>{" "}
              |
              <button
                className="btn btn-danger"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Adduser;
