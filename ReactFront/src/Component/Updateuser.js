import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";
import "./Login.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Updateuser = () => {
  const [id, idchange] = useState(0);
  const [name, namechange] = useState("");
  const [sex, sexchange] = useState("");
  const [dob, dobchange] = useState("");
  const [salary, salarychange] = useState("");
  const [department, departmentchange] = useState("");
  const [image, imageChange] = useState(null); // State to store the selected image file
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const userobj = useSelector((state) => state.user.userobj);

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { id, name, sex, dob, salary, department, image };
    dispatch(FunctionUpdateUser(userobj, id));
    navigate("/user");
  };

  useEffect(() => {
    dispatch(FetchUserObj(code));
  }, [code, dispatch]);

  useEffect(() => {
    if (userobj) {
      idchange(userobj.id);
      namechange(userobj.name);
      sexchange(userobj.sex);
      dobchange(userobj.dob);
      salarychange(userobj.salary);
      departmentchange(userobj.department);
      imageChange(userobj.image || null);
    }
  }, [userobj]);

  const logout = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to Logout?")) {
      navigate("/");
      toast.success("Logout successfully");
    }
  };

  const handleReset = () => {
    namechange("");
    sexchange("");
    dobchange("");
    salarychange("");
    departmentchange("");
    imageChange("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      imageChange(base64String);
    };
  
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    window.history.back();
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
          <div className="btn-group btn-group-lg d-flex gap-2" role="group" aria-label="...">
            <button type="buttons" className="btn btn-light btn-circle" onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} className="edit-icon" />
            </button>
            <button type="button" className="btn btn-light w-100" onClick={() => navigate("/user")}>
              Employees
            </button>
            <button type="button" className="btn btn-primary w-100 active">
              Edit
            </button>
            <button type="button" className="btn btn-light w-100" onClick={() => navigate("/user/add")}>
              Add
            </button>
            <button type="button" className="btn btn-light w-100" onClick={logout}>
              Log Out
            </button>
          </div>
          <br />
          <form onSubmit={handlesubmit} style={{ backgroundColor: "white" }}>
            <div className="card-header d-flex" style={{ textAlign: "center", backgroundColor: "lightgrey" }}>
              <h2>Edit User</h2>
            </div>
            <br />
            <div className="d-flex" style={{ textAlign: "left" }}>
              <div className="row w-50">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
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
                      placeholder="Enter Salary"
                      value={salary || ""}
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
                      <option value="">None</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Accounts">Accounts</option>
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
                    />
                    {renderUserImage()}
                    <small className="form-text text-muted">Upload a profile picture for the user.</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "center", backgroundColor: "lightgrey" }}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>{" "}
              |
              <button className="btn btn-danger" type="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Updateuser;
