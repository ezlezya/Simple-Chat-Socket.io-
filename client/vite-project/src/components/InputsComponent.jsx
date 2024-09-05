import React, { useRef, useState } from 'react'
import Messages from './Messages'
import { io } from 'socket.io-client'

export default function InputsComponent() {
    // const socket = io.connect('ws://localhost:5000')
    const socket = useRef()

    //useState-и для встановлення потрібних нам значень
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('')
    const [user, setUser] = useState("")
    const [messages, setMessages] = useState([])


    //підключаємось + починаємо прослуховувач сокет івентів
    function connect() {
        socket.current = io.connect('ws://localhost:5000')
        setConnected(true)
        socket.current.emit('connection', user)
        socket.current.emit('join_room', room)
        socket.current.on('send_message', (data) => setMessages(prev => [...prev, data]))
    }

    //якщо поле для повідомлення не пусте - відпрявляє повідомлення
    function sendMessage() {
        if (message.length > 0) {
            socket.current.emit('send_message', { message, room, user })
        }
        setMessage('')
    }


    return (
        <>
            {
                connected
                    ?
                    <div className='messagesBlock'>
                        <div className='messagesClass'>
                            <Messages messages={messages} user={user} />
                        </div>
                        <div className='messagesInputClass'>
                            <input
                                style={{ height: "100%", width: "90%", outlineColor: "#1371fd", color: "white", fontSize: "20px", border: "2px solid white", borderRadius: "5px" }}
                                value={message}
                                type="text"
                                onChange={(e) => setMessage(e.target.value)} />
                            <button className='sendMessageBtn' onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                    :
                    <div className='sendRoom'>
                        <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "60%" }}>
                            <input
                                style={{ height: "35%", border: "1px solid white", borderTopLeftRadius: "5px", color: "white", fontSize: "20px", outline: "none" }}
                                placeholder='Enter your name:'
                                value={user}
                                onChange={(e) => setUser(e.target.value)} type="text" />
                            <input
                                style={{ height: "35%", border: "1px solid white", borderTopLeftRadius: "5px", color: "white", fontSize: "20px", outline: "none" }}
                                placeholder='Connect to the room you want!'
                                value={room}
                                type="text"
                                onChange={(e) => setRoom(e.target.value)} />

                            <button
                                className='connectRoomBtn'
                                onClick={connect}>
                                Connect
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}
