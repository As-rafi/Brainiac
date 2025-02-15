import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  console.log("PrivateRoute - Current User:", currentUser);

  
  return currentUser ? children : <Navigate to="/login"  />;
}
