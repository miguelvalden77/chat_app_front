import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"



const IsUser = ({ children }) => {

    const { user } = useContext(AuthContext)

    return user ? children : <Navigate to={"/login"} />
}

export default IsUser