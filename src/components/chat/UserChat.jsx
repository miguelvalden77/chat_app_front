import { useContext, useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { getUser } from "../../../services/chat.service"
import { AuthContext } from "../../context/AuthContext"



const UserChat = ({ chat, user }) => {

    const [recipientUser, setRecipientUser] = useState(null)
    const { setReceiver, setCurrentChat, onlineUsers } = useContext(AuthContext)

    useEffect(() => {
        getRecipientUser()
    }, [chat])

    const getRecipientUser = async () => {
        const userId = chat.members.find((id) => id != user?._id)
        const { data } = await getUser(userId)
        setRecipientUser(data)
    }

    const handleSetReceiver = (receiverUser) => {
        setReceiver(receiverUser)
        setCurrentChat(chat)
    }

    const isOnline = onlineUsers.some(usuario => usuario?.userId == recipientUser?._id)

    if (!user) return null

    return (
        <Stack onClick={() => handleSetReceiver(recipientUser)} direction="horizontal" gap={3} className="user-card align-items-center justify-content-between">
            <div className="d-flex">
                <div style={{ fontSize: "0.9rem" }} className="me-2">A</div>
                <div className="text-content">
                    <div className="name">{recipientUser ? recipientUser.name : "..."}</div>
                    <div className="text">Text Message</div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-end info-container">
                <div className="date">18/11/2023</div>
                <div className="user-notification">2</div>
                <span className={isOnline ? "user-online" : ""}></span>
            </div>
        </Stack>
    )
}

export default UserChat