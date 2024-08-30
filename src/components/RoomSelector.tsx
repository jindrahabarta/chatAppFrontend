import { useState } from 'react'

const RoomSelector = ({ passData }: { passData: any }) => {
    const selectRoom = (e: any) => {
        passData(e.target.id)
    }
    const [isOpened, setisOpened] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [allRooms, setAllRooms] = useState([
        {
            text: 'Room 1',
            id: 'room1',
        },
        {
            text: 'Room 2',
            id: 'room2',
        },
        {
            text: 'Room 3',
            id: 'room3',
        },
    ])

    const [phoneMenu, setPhoneMenu] = useState(true)

    const createRoom = (e: any) => {
        e.preventDefault()
        let text = inputValue
        let id = inputValue.toLowerCase().replace(/ /g, '')
        let newRoom = { text: text, id: id }

        if (inputValue.length !== 0) {
            setAllRooms((prev: any) => [...prev, newRoom])
            setInputValue('')
            setisOpened(false)
        }
    }

    return (
        <section
            className={`z-40 h-full w-96 absolute top-0 ${
                phoneMenu ? '-translate-x-[110%]' : 'translate-x-0'
            } duration-200 sm:relative sm:translate-x-0 sm:block sm:w-full `}
        >
            {/* <div
                onClick={() => setPhoneMenu((prev) => !prev)}
                className=" sm:hidden z-50 absolute flex items-center justify-center -translate-y-1/2 top-1/2 h-14 w-5 -right-12 bg-slate-400 bg-opacity-60 backdrop-blur-sm rounded-tr-md rounded-br-md hover:cursor-pointer"
            >
                <p className="text-slate-600 text-xl">
                    {phoneMenu ? '>' : '<'}
                </p>
            </div> */}
            <div className="h-full w-full p-2  bg-slate-200 rounded-lg flex flex-col justify-between gap-2 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    {allRooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={(e) => {
                                selectRoom(e), setPhoneMenu(true)
                            }}
                            id={room.id}
                            className="p-2 rounded-lg bg-slate-300 hover:bg-slate-400 duration-200 hover:cursor-pointer"
                        >
                            <h1 className="pointer-events-none">{room.text}</h1>
                        </div>
                    ))}
                </div>
                <div>
                    {isOpened && (
                        <form
                            onSubmit={(e) => createRoom(e)}
                            className="bg-white p-2 mb-2 rounded-lg flex justify-between items-center"
                        >
                            <input
                                type="text"
                                name="inpt"
                                id="inpt"
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <p
                                className="hover:cursor-pointer"
                                onClick={createRoom}
                            >
                                Add
                            </p>
                        </form>
                    )}

                    <div
                        onClick={() => setisOpened((prev) => !prev)}
                        className="p-2 rounded-lg bg-slate-300 hover:bg-slate-400 duration-200 hover:cursor-pointer"
                    >
                        <h1 className="pointer-events-none text-2xl text-center text-slate-600 leading-6">
                            {'+'}
                        </h1>
                    </div>
                </div>
                <div
                    onClick={() => setPhoneMenu((prev) => !prev)}
                    className={`sm:hidden z-50 absolute flex items-center justify-center -translate-y-1/2 top-1/2 h-14 w-5  ${
                        phoneMenu
                            ? '-right-12 delay-200 rounded-tr-md rounded-br'
                            : 'right-0 rounded-tl-md rounded-bl'
                    } duration-200 bg-slate-400 bg-opacity-60 backdrop-blur-sm -md hover:cursor-pointer`}
                >
                    <p className="text-slate-600 text-xl">
                        {phoneMenu ? '>' : '<'}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default RoomSelector
