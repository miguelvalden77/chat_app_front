import { useContext, useState } from "react"
import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap"
import { loginUser } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


const Login = () => {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthContext)

    const handleUserInfo = (evt) => setUserInfo({ ...userInfo, [evt.target.name]: evt.target.value })
    const handleLogin = async (evt) => {
        evt.preventDefault()

        const { data } = await loginUser(userInfo)
        console.log(data)
        const authToken = data.token
        localStorage.setItem("authToken", authToken)
        localStorage.setItem("id", data.payload._id)

        authenticateUser()

        navigate("/")
    }

    return (
        <Form onSubmit={handleLogin}>
            <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Login</h2>
                        <Form.Control name="email" value={userInfo.email} onChange={handleUserInfo} placeholder="Email" type="email" />
                        <Form.Control name="password" value={userInfo.password} onChange={handleUserInfo} placeholder="Password" type="password" />

                        <Button type="submit" variant="primary">Login</Button>
                        <Alert variant="danger">
                            Ha ocurrido algo
                        </Alert>
                    </Stack>
                </Col>
            </Row>
        </Form>
    )
}

export default Login