import React from 'react'
import Message from './ui/Message'

const ChatWindow = ({ data, userName }: { data: any; userName: string }) => {
    return (
        <div className="bg-white w-full h-full pb-2 px-2 overflow-y-scroll">
            <div className="w-full min-h-full flex flex-col justify-end gap-2">
                {data.map((message: any, i: number) => (
                    <React.Fragment key={i}>
                        <Message sender={userName} data={message}></Message>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default ChatWindow
