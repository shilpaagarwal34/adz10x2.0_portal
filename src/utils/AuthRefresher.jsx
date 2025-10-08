import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFreshLoginData } from "../store/Actions/Auth/authActions";

export const AuthRefresher = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.email) {
      dispatch(getFreshLoginData(user.email, user));
    }
  }, [dispatch, location.pathname]); // <-- refetch on every route change

  return null; // this component doesn't render anything
};
