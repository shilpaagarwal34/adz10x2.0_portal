import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Company/Dashboard/Sidebar.jsx";
import Navbar from "../Components/Company/Dashboard/Navbar.jsx";
import "../Pages/Styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/Slice/Auth/authSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteToast } from "../utils/ConfirmDeleteToast.jsx";
import { logoutUser } from "../store/Actions/Auth/authActions.js";

const CompanyLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(setLoading(false));
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    try {
      ConfirmDeleteToast({
        message: "Are you sure you want to Logout?",
        onConfirm: async () => {
          await dispatch(logoutUser({ user }));
          navigate("/login");
        },
      });

      // await dispatch(logoutUser({user}));
      // localStorage.clear();
      // navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="layout">
      <Sidebar
        menu={user?.menu}
        open={isSidebarOpen}
        handleLogout={handleLogout}
      />
      <div className="main-content" style={{ backgroundColor: "#f7f7fe" }}>
        <Navbar user={user} toggleSidebar={toggleSidebar} />
        <ToastContainer />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default CompanyLayout;
