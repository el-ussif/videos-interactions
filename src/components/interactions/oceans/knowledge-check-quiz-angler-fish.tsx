"use client"

import QuizForm from "@/components/custom-ui/quiz-form";
import useTokenStore from "@/store/token-store";

const fishQuizData = {
    id: "football-fish",
    question: 'What is the "bulb" on top of a Football Fish\'s head for?',
    options: ["Lighting up the ocean", "Attracting prey", "Defending against predators"],
    correctAnswers: [1,2], // Attracting prey
    points: 20,
    type: "multiple" as const,
}

export default function KnowledgeCheckQuizAnglerFish({ onComplete }: { onComplete?: () => void }) {
    const {addToken} = useTokenStore()

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleQuizSubmit = (result: any) => {
        console.log(`Points earned: ${result.pointsEarned}/${result.totalPoints}`)
        console.log(`Answer ${result.isCorrect ? "correct" : "incorrect"}`)
        addToken(result.pointsEarned)
        if (onComplete) {
            onComplete()
        }
    }

    return (
        <div className="items-center  flex  justify-center text-black">
            <div className="bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg border-white/50 border rounded-[80px] xl py-8 px-[155px] text-white text-center shadow-3xl">
                <div>
                    <h2 className="text-white font-bold text-6xl">
                        Knowledge Check
                    </h2>
                    <h2 className="text-white font-bold text-2xl mt-5">
                        What is the <strong className="font-semibold text-2xl">“bulb”</strong> on top of a Football Fish’s head for?
                    </h2>
                </div>
                <div className="flex space-x-[120px] items-center mt-6">
                    <div className="w-[420px]">
                        <img src="/images/oceans/angler-fish-2.png" alt=""/>
                    </div>
                    <div className="w-[375px]">
                        <QuizForm
                            question={fishQuizData}
                            layout="vertical"
                            onSubmit={handleQuizSubmit}
                            buttonClassName="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
