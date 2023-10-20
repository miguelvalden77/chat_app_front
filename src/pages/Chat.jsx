import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Container, Stack } from "react-bootstrap"
import UserChat from "../components/chat/UserChat"
import PotentialChats from "../components/chat/PotentialChats"
import { Navigate } from "react-router-dom"
import MainChat from "../components/chat/MainChat"



const Chat = () => {

    const { userChats, user } = useContext(AuthContext)

    useEffect(() => {
        console.log({ userChats })
    }, [])

    // if (!user) return <Navigate to={"/login"} />

    return (
        <Container className="chat-container">
            <PotentialChats />
            {userChats?.length > 0 &&
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {!userChats && <p>Loading ...</p>}
                        {userChats && userChats.map((chat, index) => {
                            return <UserChat chat={chat} key={index} user={user} />
                        })}
                    </Stack>

                    <MainChat user={user} />
                </Stack>}
        </Container>
    )
}

export default Chat