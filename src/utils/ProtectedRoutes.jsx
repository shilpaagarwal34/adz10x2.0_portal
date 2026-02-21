import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ProtectedSocietyRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const isSocietyUser =
    user?.user_type === "Society_Admin" || user?.user_type === "Society_User";

  if (!isAuthenticated || !isSocietyUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const ProtectedCompanyRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const userType = user?.user_type;

  const isCompanyUser =
    userType === "Company_Admin" || userType === "Company_User";

  if (!isAuthenticated || !isCompanyUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

// export const ProtectedAdminRoute = ({ children }) => {
//   const location = useLocation();

//   const token = localStorage.getItem("admin_token");
//   if (!token && location.pathname !== "/admin/login") {
//     console.log("s");
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// };
export const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setIsAuthenticated(!!token);
    setCheckingAuth(false);
  }, []); // ✅ only once on mount

  if (checkingAuth) return null; // Or a loading spinner

  if (!isAuthenticated && location.pathname !== "/admin/login") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const adminToken = localStorage.getItem("admin_token");
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const userType = userData?.user_type;

  if (
    token &&
    (userType === "Society_Admin" ||
      userType === "Society_User" ||
      userType === "Company_Admin" ||
      userType === "Company_User")
  ) {
    return (
      <Navigate
        to={
          userType === "Society_Admin" || userType === "Society_User"
            ? "/society"
            : "/company"
        }
      />
    );
  }

  if (adminToken) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export const PublicAdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const ProtectedActionRoute = ({ children, allowedUserTypes = [] }) => {
  const token = localStorage.getItem("auth_token");
  const userData = JSON.parse(localStorage.getItem("user_data") || "null");
  const userType = userData?.user_type;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes.length && !allowedUserTypes.includes(userType)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
