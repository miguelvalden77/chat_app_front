import service from "./config.service"


const registerUser = (userInfo) => {
    return service.post("user/register", userInfo)
}

const loginUser = (userInfo) => {
    return service.post("user/login", userInfo)
}

const verifyToken = () => {
    return service.get("user/verify")
}

export { registerUser, loginUser, verifyToken }