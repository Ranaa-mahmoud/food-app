import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { loginData } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  // 1. لو مش مسجل دخول
  if (!token || !loginData) {
    return <Navigate to="/login" />;
  }

  // 2. لو فيه roles محددة ومش مطابق
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(loginData?.userGroup)
  ) {
    return <Navigate to="/dashboard" />;
  }

  // 3. كل حاجة تمام
  return children;
}