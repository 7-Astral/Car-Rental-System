import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const userAuth = () => {
  const Auth = { user: "", admin: "" };
  Auth.user = localStorage.getItem("user");
  Auth.admin = localStorage.getItem("admin");
  return Auth;
};

function ProtectedRoute() {
  const Auth = userAuth();
  if (Auth.user) {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  } else if (Auth.admin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
