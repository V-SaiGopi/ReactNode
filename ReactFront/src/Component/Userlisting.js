import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Userlisting = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.loaduser();
  }, []);

  const handledelete = (index) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(index);
      toast.success("User removed successfully.");
      props.loaduser();
    }
  };

  const logout = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to Logout?")) {
      navigate("/");
      toast.success("Logout successfully");
    }
  };

  const renderUserImage = (item) => {
    if (item.image && typeof item.image === 'string') {
      const blobData = atob(item.image);
      const arrayBuffer = new ArrayBuffer(blobData.length);
      const uintArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < blobData.length; i++) {
        uintArray[i] = blobData.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  
      const base64String = URL.createObjectURL(blob);
      return (
        <img
          src={base64String}
          alt="User"
          className="user-image"
        />
      );
    } else if (item.image && Array.isArray(item.image)) {
      const base64String = btoa(String.fromCharCode.apply(null, item.image));
      return (
        <img
          src={`data:image/jpeg;base64,${base64String}`}
          alt="User"
          className="user-image custom-image-style"
        />
      );
    }
    return null;
  };
  
  

  return (
    props.user.loading ? (
      <div>
        <h2>Loading...</h2>
      </div>
    ) : props.user.errmessage ? (
      <div>
        <h2>{props.user.errmessage}</h2>
      </div>
    ) : (
      <>
        <h1 className="fixed-top">Employee Management System</h1>
        <div className="dash-content">
          <div className="container" style={{ color: "black" }}>
            <div
              className="btn-group btn-group-lg d-flex gap-2"
              role="group"
              aria-label="..."
            >
              <button
                type="button"
                className="btn btn-primary w-100 active"
              >
                Employees
              </button>
              <button type="button" className="btn btn-light w-100">
                Edit
              </button>
              <button
                type="button"
                className="btn btn-light w-100"
                onClick={() => navigate("/user/add")}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-light w-100"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
            <br />
            <div className="form-div">
              <table className="table table-borderedtable table-bordered table-striped table-hover table-responsive table-light">
                <thead>
                  <tr>
                    <td className="bg-dark text-white">ID</td>
                    <td className="bg-dark text-white">Name</td>
                    <td className="bg-dark text-white">Sex</td>
                    <td className="bg-dark text-white">DOB</td>
                    <td className="bg-dark text-white">Salary</td>
                    <td className="bg-dark text-white">Department</td>
                    <td className="bg-dark text-white">Image</td>
                    <td className="bg-dark text-white">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {props.user.userlist &&
                    props.user.userlist.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.sex}</td>
                        <td>{item.dob}</td>
                        <td>{item.salary}</td>
                        <td>{item.department}</td>
                        <td>{renderUserImage(item)}</td>
                        <td>
                          <Link
                            to={"/user/edit/" + item.id}
                            className="btn btn-primary"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="edit-icon"
                            />{" "}
                            Edit
                          </Link>{" "}
                          |
                          <button
                            onClick={() => {
                              handledelete(item.id);
                            }}
                            className="btn btn-danger"
                            style={{ height: "40px" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="edit-icon"
                            />{" "}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(Removeuser(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
