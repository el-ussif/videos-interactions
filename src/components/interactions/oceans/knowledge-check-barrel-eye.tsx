"use client"

import QuizForm from "@/components/custom-ui/quiz-form";

const fishQuizData = {
    id: "football-fish",
    question: 'What is the "bulb" on top of a Football Fish\'s head for?',
    options: [
        "Indirectly by less sunlight",
        "Indirectly by loss of food",
        "Directly by ocean temps",
        "Directly by youth death"
    ],
    correctAnswers: [0],
    points: 10,
    type: "single" as const,
}

export default function KnowledgeCheckBarrelEye({ onComplete }: { onComplete?: () => void }) {
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
                        In How have Barreleyes been affected by <strong className="font-semibold text-2xl">
                            climate change
                        </strong>
                        ?
                    </h2>
                </div>
                <div className="w-full flex justify-center items-center space-x-6 mt-6">
                    <div className="">
                        <img src="/images/oceans/bull.png" className="w-[60px] h-[70px]" alt=""/>
                    </div>
                    <div className="">
                        <img src="/images/oceans/barrel-eye-fish-4.png" className="w-[290px]" alt=""/>
                    </div>
                </div>
                <div className="flex space-x-[120px] items-center mt-8">
                    <div className="w-full [375px]">
                        <QuizForm
                            question={fishQuizData}
                            layout="grid"
                            itemsPerRow={2}
                            onSubmit={handleQuizSubmit}
                            buttonClassName="w-full md:w-[350px] mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
