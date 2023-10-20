import service from "./config.service"

const getUserChats = (userId) => {
    return service.get(`chat/findUserChats/${userId}`)
}

const getUser = (id) => {
    return service.get(`user/findUser/${id}`)
}

const getPotentialChats = (id) => {
    return service.get(`chat/findPotential/${id}`)
}

const createChat = (info) => {
    return service.post("chat/createChat", info)
}

const findChatMessages = (id) => {
    return service.get(`message/getMessages/${id}`)
}

const createMessage = (info) => {
    return service.post("message/createMessage", info)
}

export { getUserChats, getUser, getPotentialChats, createChat, findChatMessages, createMessage }