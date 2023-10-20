import { useState } from "react"
import { Alert, Button, Row, Col, Stack, Form } from "react-bootstrap"
import { registerUser } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"


const Register = () => {

    const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate()

    const handleUserInfo = (evt) => setUserInfo({ ...userInfo, [evt.target.name]: evt.target.value })
    const handleRegister = async (evt) => {
        evt.preventDefault()

        await registerUser(userInfo)
        navigate("/login")
    }

    return (
        <Form onSubmit={handleRegister}>
            <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Register</h2>
                        <Form.Control onChange={handleUserInfo} value={userInfo.name} name="name" placeholder="Name" type="text" />
                        <Form.Control onChange={handleUserInfo} value={userInfo.email} name="email" placeholder="Email" type="email" />
                        <Form.Control onChange={handleUserInfo} value={userInfo.password} name="password" placeholder="Password" type="password" />

                        <Button type="submit" variant="primary">Register</Button>
                        <Alert variant="danger">
                            Ha ocurrido algo
                        </Alert>
                    </Stack>
                </Col>
            </Row>
        </Form>
    )
}

export default Register