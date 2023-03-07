import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { LoggedInStatus } from "../contexts/LoggedInStatus";

const ProtectedRoute = ({ children }) => {
    const loggedIn = useContext(LoggedInStatus);

    return loggedIn === true ? children : <Navigate to="/signin" replace />

}

export default ProtectedRoute 