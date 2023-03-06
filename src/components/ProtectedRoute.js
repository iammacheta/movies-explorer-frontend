import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoggedInStatus } from "../contexts/LoggedInStatus"

const ProtectedRoute = ({ children }) => {

    const loggedIn = useContext(LoggedInStatus);

    return loggedIn ? children : <Navigate to="/signin" />

}

export default ProtectedRoute 