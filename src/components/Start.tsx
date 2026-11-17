import { useState } from 'react'

type StartViewProps = {
    onStart: (peopleCount: number, timeAvailable: string) => void;
};

export default function Start(props: StartViewProps) {
    const [peopleCount, setPeopleCount] = useState<number>(1)
    const [timeAvailable, setTimeAvailable] = useState<string>("")

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onStart(peopleCount, timeAvailable)
            }}
        >
            <div className='text-white space-y-6'>
                <input
                    type="number"
                    min={1}
                    value={peopleCount}
                    name="peopleCount"
                    placeholder='How many people'
                    className='bg-[#3B4877] w-full rounded-lg p-4 text-md resize-none placeholder:text-[#05060C] outline-none focus:ring-2 focus:ring-[#51E08A]'
                    onChange={(e) => setPeopleCount(Number(e.target.value))}
                />
                <input
                    name="timeAvailable"
                    value={timeAvailable}
                    placeholder='How much time do you have'
                    className='bg-[#3B4877] w-full rounded-lg p-4 text-md resize-none placeholder:text-[#05060C] outline-none focus:ring-2 focus:ring-[#51E08A]'
                    onChange={(e) => setTimeAvailable(e.target.value)}
                />
                <button
                    type="submit"
                    className='text-[#000C36] bg-[#51E08A] text-4xl font-bold w-full py-4 rounded-lg mt-4 cursor-pointer '
                >
                    Start
                </button>
            </div>

        </form>
    )
}