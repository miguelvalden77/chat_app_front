import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../../services/auth.service";
import { getUserChats } from "../../services/chat.service";

import { io } from "socket.io-client"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [userChats, setUserChats] = useState()
    const [receiver, setReceiver] = useState()
    const [currentChat, setCurrentChat] = useState()

    const [socket, setSocket] = useState()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [messages, setMessages] = useState()

    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [user])

    useEffect(() => {
        if (socket == null) return
        socket.emit("addNewUser", user?._id)

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })

        return () => {
            socket.off("getOnlineUsers")
        }
    }, [socket])

    // Add message
    useEffect(() => {
        if (socket == null) return

        socket.emit("sendMessage", { ...newMessage, receiver: receiver._id }) // Cuidado con esto.... "recipientId"
        console.log(newMessage)

    }, [newMessage])

    //
    useEffect(() => {
        if (socket == null) return

        socket.on("getMessage", response => {
            if (currentChat?._id != response.chatId) return

            setMessages((prev) => [...prev, response])
        })

        return () => {
            socket.off("getMessage")
        }

    }, [socket, currentChat])

    useEffect(() => {

        // updateUserChats()
        authenticateUser()

    }, [])

    const updateUserChats = async (id) => {

        if (id == null || id == undefined) return
        const { data } = await getUserChats(id)
        setUserChats(data)
    }

    const authenticateUser = async () => {

        try {
            const { data } = await verifyToken()
            console.log(data)
            setUser(data)
            updateUserChats(data._id)

        } catch (err) {
            console.log(err)
            setUser(null)
        }
    }

    return <AuthContext.Provider value={{ authenticateUser, user, setUser, userChats, setUserChats, setReceiver, receiver, currentChat, setCurrentChat, onlineUsers, messages, setMessages, setNewMessage }}>
        {children}
    </AuthContext.Provider>
}
