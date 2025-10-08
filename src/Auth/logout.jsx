// src/Auth/Logout.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/Actions/Auth/authActions.js";


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all auth-related data
    dispatch(logoutUser());
    localStorage.clear();
    // Redirect to login page
    navigate("/login");
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
