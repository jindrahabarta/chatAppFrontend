import { useEffect, useRef, useState } from 'react'

import { io } from 'socket.io-client'
import ChatWindow from '../components/ChatWindow'
import Login from '../components/Connect'
import toast, { Toaster } from 'react-hot-toast'
import RoomSelector from '../components/RoomSelector'

function MainPage() {
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState<
        {
            message: string
            user: string
            timestamp: {
                day: number
                month: number
                hours: number
                minutes: number
            }
        }[]
    >([])
    const [isConnected, setIsConnected] = useState(true)

    const selectedRoom = useRef('room1')

    const socket = useRef(io('ws://localhost:3000'))

    useEffect(() => {
        socket.current.emit('joinRoom', selectedRoom.current)
        socket.current.on(
            'roomMessageRes',
            (res: {
                message: string
                user: string
                timestamp: {
                    day: number
                    month: number
                    hours: number
                    minutes: number
                }
            }) => {
                setAllMessages((prev) => [...prev, res])
            }
        )
    }, [])

    const send = (e: any) => {
        e.preventDefault()
        const day = new Date().getDate()
        const month = new Date().getMonth()
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()

        if (userName.length === 0) {
            toast.error('Nezapomeň se přihlásit')
            setIsConnected(false)
        } else if (message.length === 0) {
            return
        } else {
            const newMessage = {
                message: message,
                user: userName,
                timestamp: {
                    day: day,
                    month: month,
                    hours: hours,
                    minutes: minutes,
                },
            }

            socket.current.emit('roomMessage', newMessage, selectedRoom.current)

            setMessage('')
        }
    }

    const roomJoiner = (data: string) => {
        socket.current.emit('leaveRoom', selectedRoom.current)

        selectedRoom.current = data
        socket.current.emit('joinRoom', selectedRoom.current)

        setAllMessages([])
    }

    return (
        <div className="relative p-2 h-screen flex sm:gap-2  bg-slate-500">
            <Toaster></Toaster>

            <Login
                passUsername={(username: string) => setUserName(username)}
            ></Login>

            {!isConnected && (
                <Login
                    passUsername={(username: string) => setUserName(username)}
                ></Login>
            )}

            <div className="relative h-full w-0 sm:w-2/5 lg:w-1/3">
                <RoomSelector
                    passData={(data: any) => roomJoiner(data)}
                ></RoomSelector>
            </div>

            <div className="h-full w-full sm:w-3/5 lg:w-2/3 flex flex-col">
                <section className="h-full relative rounded-t-lg overflow-hidden ">
                    <div className="w-full px-4 py-2 flex items-center justify-between  bg-slate-400 bg-opacity-50 backdrop-blur-sm absolute top-0">
                        <p className="font-bold">{selectedRoom.current}</p>
                        <div className="flex items-center gap-2">
                            <p>{userName}</p>
                            <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
                        </div>
                    </div>

                    <ChatWindow
                        userName={userName}
                        data={allMessages}
                    ></ChatWindow>
                </section>

                <section className="w-full px-4 py-2 bg-slate-300 rounded-b-lg ">
                    <form
                        className="w-full flex gap-2"
                        onSubmit={(e) => send(e)}
                    >
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            className="bg-white  outline-none text-xl px-1 flex-1"
                            type="text"
                        />
                        <button type="submit" className="text-xl">
                            Send
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default MainPage
