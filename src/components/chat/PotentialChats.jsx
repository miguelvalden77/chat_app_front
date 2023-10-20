import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { createChat, getPotentialChats } from "../../../services/chat.service"


const PotentialChats = () => {

    const [potentialChats, setPotentialChats] = useState([])
    const { setUserChats, onlineUsers } = useContext(AuthContext)

    useEffect(() => {
        getPotChats()
    }, [])

    const getPotChats = async () => {

        const userId = localStorage.getItem("id")
        const { data } = await getPotentialChats(userId)
        console.log(data)

        setPotentialChats(data)
    }

    const handleNewChat = async (id) => {

        const { data } = await createChat({ userId: user._id, otherId: id })
        setUserChats((prevState) => [...prevState, data])
        getPotChats()

    }

    return (
        <section className="potential-container">
            {potentialChats?.length > 0 && potentialChats.map((usuario, index) => {
                return <article onClick={() => handleNewChat(usuario._id)} className="potential-contact" key={index}>
                    {usuario?.name}
                    <span className={onlineUsers.some(user => user?.userId == usuario?._id) ? "user-online" : ""}></span>
                </article>
            })}
        </section>
    )

}

export default PotentialChats