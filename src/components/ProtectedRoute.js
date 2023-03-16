import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoggedInStatus } from "../contexts/LoggedInStatus";

const ProtectedRoute = ({ children }) => {
    const loggedIn = useContext(LoggedInStatus);
    const token = localStorage.getItem('token')

    return loggedIn || token ? children : <Navigate to="/" replace />
}

export default ProtectedRoute; 