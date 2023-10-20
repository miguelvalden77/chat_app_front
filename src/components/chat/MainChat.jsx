import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { createMessage, findChatMessages } from "../../../services/chat.service"



const MainChat = ({ user }) => {

    const { receiver, currentChat, setMessages, messages, setNewMessage } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        findMessages()
    }, [currentChat])

    const findMessages = async () => {
        const { data } = await findChatMessages(currentChat?._id)
        setMessages(data)
    }

    const handleNewMessage = async () => {
        const { data } = await createMessage({ chatId: currentChat._id, senderId: user._id, text: inputValue })
        setMessages((prev) => [...prev, data])
        setNewMessage(data)
        setInputValue("")
    }

    if (!receiver) return <section className="main-chat-section">
        <p className="main-chat-user">No chat</p>
    </section>

    return (
        <section className="main-chat-section">
            <h2 className="main-chat-user">{receiver.name}</h2>
            <div className="messages-container">
                {messages && messages.map((message, index) => {
                    return <p className={message.senderId == user._id ? "own-message" : "other-message"} key={index}>{message.text}</p>
                })}
            </div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center" }}>
                <input className="chat_text_input" value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} type="text" />
                <button className="chat_button" onClick={handleNewMessage}>Send</button>
            </div>
        </section>
    )
}

export default MainChat