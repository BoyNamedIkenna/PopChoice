import { useState } from "react";

type QuestionsProps = {
    personNumber: number;
    totalPeople: number;
    onSubmit: (answers: { favoriteMovie: string, era: string, vibe: string[] }) => void;
};

export default function Questions(props: QuestionsProps) {
    const [answers, setAnswers] = useState<{ favoriteMovie: string, era: "New" | "Classic" | "", vibe: string[] }>({
        favoriteMovie: "",
        era: "",
        vibe: []
    });

    const ERA_OPTIONS = ["New", "Classic"]
    const VIBE_OPTIONS = ["Fun", "Serious", "Inspiring", "Scary"];

    const handleChange = (field: keyof typeof answers, value: string) => {
        setAnswers(prev => ({ ...prev, [field]: value }));
    };

    const toggleVibe = (tag: string) => {
        const selectedVibes = answers.vibe.includes(tag) ? answers.vibe.filter(t => t !== tag) : [...answers.vibe, tag]
        setAnswers(prev => ({ ...prev, vibe: selectedVibes }));
    }

    return (
    <div className="text-white">
        <p className="text-[#51E08A] font-semibold mb-6">
            Person {props.personNumber} of {props.totalPeople}
        </p>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit(answers)
            }}
            className="space-y-8"
        >
            <div>
                <h2 className="text-lg font-bold mb-2.5">What's your favorite movie and why?</h2>
                <textarea
                    value={answers.favoriteMovie}
                    onChange={(e) => handleChange('favoriteMovie', e.target.value)}
                    placeholder="My favorite movie is The Prestige because of its thrilling plot twist that I couldn't see coming."
                    className="bg-[#3B4877] text-white w-full rounded-lg p-4 text-md resize-none placeholder:text-[#05060C] outline-none focus:ring-2 focus:ring-[#51E08A]"
                    rows={3}
                />
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2.5">Are you in the mood for something new or a classic?</h2>
                <div className="flex flex-wrap gap-3">
                    {ERA_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => handleChange('era', option)}
                            className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition-colors ${answers.era === option ? 'bg-[#51E08A] text-[#000C36]' : 'bg-[#3B4877] text-white'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2.5">What are you in the mood for? (pick one or more)</h2>
                <div className="flex flex-wrap gap-3">
                    {VIBE_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => toggleVibe(option)}
                            className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition-colors ${answers.vibe.includes(option) ? 'bg-[#51E08A] text-[#000C36]' : 'bg-[#3B4877] text-white'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className="text-[#000C36] bg-[#51E08A] text-4xl font-bold w-full py-4 rounded-lg cursor-pointer"
            >
                {props.personNumber === props.totalPeople ? "Get Movie" : "Next Person"}
            </button>
        </form>
    </div>
)
}