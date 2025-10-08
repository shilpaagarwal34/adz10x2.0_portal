import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Common/Sidebar.jsx";
import Navbar from "../Components/Common/Navbar.jsx";
import "../Pages/Styles/Dashboard.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/Actions/Auth/authActions.js";
import { ConfirmDeleteToast } from "../utils/ConfirmDeleteToast.jsx";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  

  const handleLogout = async () => {
    try {
      ConfirmDeleteToast({
        message: "Are you sure you want to Logout?",
        onConfirm: async () => {
          await dispatch(logoutUser({ user }));
          navigate("/login");
        },
      });

      // await dispatch(logoutUser({ user }));
      // navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // initially open

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // show on big screen
      } else {
        setIsSidebarOpen(false); // hide on small screen
      }
    };

    window.addEventListener("resize", handleResize);

    // run once on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="layout">
      <Sidebar handleLogout={handleLogout} open={isSidebarOpen} />
      <div
        className="main-content  position-absolute"
        style={{ backgroundColor: "#f7f7fe" }}
      >
        <Navbar handleLogout={handleLogout} toggleSidebar={toggleSidebar} />
        <ToastContainer />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
