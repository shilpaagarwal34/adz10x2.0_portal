import { useSelector } from "react-redux";

const PermissionRoute = ({ permission, children }) => {
  const { user } = useSelector((state) => state.auth);

  // if (!user) return null;

  const { user_type, privileges, menu } = user;

  const normalizedPermission =
    permission === "advertisement" ? "campaign" : permission;

  // const hasPermission =
  //   user_type === "Society_Admin" || user_type === "Company_Admin"
  //     ? menu?.[permission]
  //     : user_type === "Society_User" || user_type === "Company_User"
  //     ? privileges?.includes(permission)
  //     : false;

  const hasPermission =
    user_type === "Society_Admin" || user_type === "Company_Admin"
      ? menu?.[permission]
      : user_type === "Society_User" || user_type === "Company_User"
      ? privileges?.includes(normalizedPermission)
      : false;

      
  if (!hasPermission) return null;

  return children;
};

export default PermissionRoute;
