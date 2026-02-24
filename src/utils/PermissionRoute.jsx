// Allow view for all; actions are gated per-page (e.g. Complete Profile modal).
const PermissionRoute = ({ permission, children }) => {
  return children;
};

export default PermissionRoute;
