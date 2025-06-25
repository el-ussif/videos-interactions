"use client"

import QuizForm from "@/components/custom-ui/quiz-form";

const fishQuizData = {
    id: "football-fish",
    question: 'What is the "bulb" on top of a Football Fish\'s head for?',
    options: [
        "Rising ocean temperatures kill them before adulthood",
        "Overfishing cuts down their population numbers",
        "Seaweed loss reduces food supply",
        "Temperature changes reduce the amount of mating"
    ],
    correctAnswers: [0],
    points: 10,
    type: "single" as const,
}

export default function KnowledgeCheckQuizJapaneseSpiderCrab({ onComplete }: { onComplete?: () => void }) {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleQuizSubmit = (result: any) => {
        console.log(`Points earned: ${result.pointsEarned}/${result.totalPoints}`)
        console.log(`Answer ${result.isCorrect ? "correct" : "incorrect"}`)
        if (onComplete) {
            onComplete()
        }
    }

    return (
        <div className="items-center w-full max-w-[1140px] flex  justify-center text-black">
            <div className="bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg border-white/50 border rounded-[80px] xl py-8 px-[90px] text-white text-center shadow-3xl">
                <div>
                    <h2 className="text-white font-bold mt-6 text-6xl">
                        Knowledge Check
                    </h2>
                    <h2 className="text-white text-2xl mt-5">
                        In what ways are <strong className="font-semibold text-2xl">
                            climate change and human behavior
                        </strong> harming Japanese Spider Crabs ?
                    </h2>
                </div>
                <div className="flex space-x-[120px] items-center mt-8">
                    <div className="w-full [375px]">
                        <QuizForm
                            question={fishQuizData}
                            layout="grid"
                            itemsPerRow={2}
                            onSubmit={handleQuizSubmit}
                            buttonClassName="w-full md:w-[350px] mt-8"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
