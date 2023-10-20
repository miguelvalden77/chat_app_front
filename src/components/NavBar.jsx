import { Link } from "react-router-dom"
import { Button, Container, Navbar } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


const NavBar = () => {

    const { user, setUser } = useContext(AuthContext)

    const logout = () => {
        localStorage.removeItem("authToken")
        setUser(null)
    }

    return (
        <Navbar bg="dark" className="mb-4">
            <Container>
                <Link to={"/"} style={{ textDecoration: "none", color: "whitesmoke" }}>
                    <h3 style={{ fontSize: "1.5rem" }}>Chat App</h3>
                </Link>

                {user ?
                    <section className="auth-container">
                        <Button onClick={logout} variant="danger">Logout</Button>
                    </section>
                    : <section className="auth-container">
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Register</Link>
                    </section>}
            </Container>
        </Navbar>
    )
}

export default NavBar