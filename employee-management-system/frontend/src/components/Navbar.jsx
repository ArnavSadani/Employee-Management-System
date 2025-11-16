import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useAuth } from "../context/UserContext";


const Navbar = () => {

  const { email, logoutuser } = useAuth();
  const { pathname } = useLocation();
  const { isAdmin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const active = {
    fontWeight: "bold",
    color: "#1976d2",
    borderBottom: "2px solid #1976d2",
  };

  return (
    <nav className="navbar">

  {!isAdmin && pathname !== "/" && pathname !== "/admin-login" && (
    <>
      {/* <Link className={pathname === "/employees" ? "nav-link active" : "nav-link"} to="/employees">
        Home
      </Link> */}

      <Link className={pathname === "/apply-leave" ? "nav-link active" : "nav-link"} to="/apply-leave">
        Apply Leave
      </Link>

      <Link className={pathname === "/attendance" ? "nav-link active" : "nav-link"} to="/attendance">
        Attendance
      </Link>

      <Link className={pathname === "/salaryslip" ? "nav-link active" : "nav-link"} to="/salaryslip">
        Salary Slip
      </Link>

       {/* <Link className={pathname === "/employees" ? "nav-link active" : "nav-link"} to="/employees">
        Home
      </Link> */}

      {email !== "" && (
        <button className="nav-btn" onClick={() => { logoutuser(); navigate("/"); }}>
          Logout User
        </button>
      )}
    </>
  )}

    {isAdmin && (
   <Link className={pathname === "/employees" ? "nav-link active" : "nav-link"} to="/employees">
        Add Employee
       </Link>
  )}

  {isAdmin && (
    <Link className={pathname === "/manage-leaves" ? "nav-link active" : "nav-link"} to="/manage-leaves">
      Manage Leaves
    </Link>
  )}

  {isAdmin && (
    <Link className={pathname === "/salarycount" ? "nav-link active" : "nav-link"} to="/salarycount">
      Calculate Salary
    </Link>
  )}

  {isAdmin && (
    <button className="nav-btn" onClick={() => { logout(); navigate("/"); }}>
      Logout Admin
    </button>
  )}

  {!isAdmin && pathname === "/" && (
    <Link className={pathname === "/admin-login" ? "nav-link active" : "nav-link"} to="/admin-login">
      Admin Login
    </Link>
  )}

</nav>

  );
};

export default Navbar;
