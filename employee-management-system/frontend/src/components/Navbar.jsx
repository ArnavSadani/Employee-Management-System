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
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#f0f0f0",
        marginBottom: "20px",
      }}
    >

      {!isAdmin && pathname !== "/" && pathname !== "/admin-login" &&
        <>
          <Link style={pathname === "/employees" ? active : {}} to="/employees">
            Home
          </Link>

          <Link style={pathname === "/apply-leave" ? active : {}} to="/apply-leave">
            Apply Leave
          </Link>

          <Link style={pathname === "/attendance" ? active : {}} to="/attendance">
            Attendance
          </Link>

          {email !== "" && <button onClick={() => { logoutuser, navigate("/") }}>Logout User</button>}
        </>
      }

      {/* ✅ Only Admin can see this */}
      {isAdmin && (
        <Link
          style={pathname === "/manage-leaves" ? active : {}}
          to="/manage-leaves"
        >
          Manage Leaves
        </Link>
      )}

      {isAdmin && (
        <Link
          style={pathname === "/salarycount" ? active : {}}
          to="/salarycount"
        >
          Calculate Salary
        </Link>
      )}
      {
        isAdmin && <button onClick={() => { logout(); navigate("/") }}>Logout Admin</button>  
      }

      {/* ✅ Admin Login/Logout */}
      {!isAdmin && pathname === "/" &&
        <Link style={pathname === "/admin-login" ? active : {}} to="/admin-login">
          Admin Login
        </Link>
      }


    </nav>
  );
};

export default Navbar;
