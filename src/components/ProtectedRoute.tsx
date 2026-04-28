import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const isAuth = localStorage.getItem("isLoggedIn");

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;