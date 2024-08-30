import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Login = ({ passUsername }: { passUsername?: any }) => {
    const [Username, setUsername] = useState('')
    const [isConnected, setIsConnected] = useState(false)

    const connect = (e: any) => {
        e.preventDefault()
        if (Username.length > 0) {
            passUsername(Username)
            setIsConnected(true)
            toast('Ahoj, ' + Username, {
                icon: '👏',
            })
        } else {
            toast.error('Zadej jméno')
        }
    }

    if (isConnected) return

    return (
        <section className="w-screen h-screen absolute top-0 left-0 bg-slate-700 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
            <Toaster position="top-center" reverseOrder={false} />
            <form
                onSubmit={(e) => connect(e)}
                className="bg-slate-200 rounded-lg p-4 flex flex-col gap-2"
            >
                <div className="flex items-center gap-2">
                    <label htmlFor="username"> Username:</label>

                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={Username}
                        type="text"
                        name="username"
                        id="username"
                    />
                </div>

                <button className=" self-end " type="submit">
                    Connect
                </button>
            </form>
        </section>
    )
}

export default Login
