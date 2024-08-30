import React from 'react'

const Message = ({
    data,
    sender,
}: {
    data: {
        message: string
        user: string
        timestamp: {
            day: number
            month: number
            hours: number
            minutes: number
        }
    }
    sender: string
}) => {
    if (sender === data.user) {
        return (
            <div className="w-fit flex flex-col  self-end">
                <div className="flex justify-end items-center gap-2">
                    <div className="bg-customBlue text-white px-3 py-2 rounded-full">
                        <p>{data.message}</p>
                    </div>
                    <div className="bg-slate-300 rounded-full w-8 h-8"></div>
                </div>
                <p className=" self-end text-slate-500 text-xs pr-12">
                    {data.timestamp.day + '.'} {data.timestamp.month + '.'}{' '}
                    {data.timestamp.hours + ':'}
                    {data.timestamp.minutes < 10
                        ? '0' + data.timestamp.minutes
                        : data.timestamp.minutes}
                </p>
            </div>
        )
    }

    return (
        <div className="w-fit flex flex-col  self-start">
            <div className="flex items-center gap-2">
                <div className="bg-slate-300 rounded-full w-8 h-8"></div>
                <div className="bg-slate-400 text-white px-3 py-2 rounded-full">
                    <p>{data.message}</p>
                </div>
            </div>
            <p className=" self-start text-slate-500  text-xs pl-12">
                {data.timestamp.day + '.'} {data.timestamp.month + '.'}{' '}
                {data.timestamp.hours + ':'}
                {data.timestamp.minutes < 10
                    ? '0' + data.timestamp.minutes
                    : data.timestamp.minutes}
            </p>
        </div>
    )
}

export default Message
