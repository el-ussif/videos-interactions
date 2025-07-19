"use client"

import {useEffect, useState} from "react"
import QuizForm from "@/components/custom-ui/quiz-form"
import {playAudio} from "@/lib/utils";
import useQuizAudioHandler from "@/hooks/use-quiz-audio-handler";

const fishQuizData = {
    id: "football-fish",
    question: 'What is the "bulb" on top of a Football Fish\'s head for?',
    options: ["Lighting up the ocean", "Attracting prey", "Defending against predators"],
    correctAnswers: [1, 2], // Attracting prey, Defending against predators
    points: 20,
    type: "multiple" as const,
}

const audioPaths = {
    intro: "/audios/ocean/frame-8-intro.wav",
    question: "/audios/ocean/frame-8-question.wav",
    correct: "/audios/ocean/frame-8-correct-answer.wav",
    incorrect: "/audios/ocean/frame-8-incorrect-answer.wav",
}


export default function KnowledgeCheckQuizAnglerFish({ onComplete }: { onComplete?: () => void }) {
    const [isReady, setIsReady] = useState(false)
    const handleQuizSubmit = useQuizAudioHandler(audioPaths, onComplete)


    useEffect(() => {
        const playIntroAndQuestion = async () => {
            await playAudio(audioPaths.intro)
            setTimeout(async () => {
                await playAudio(audioPaths.question)

                setIsReady(true)
            }, 1000)
        }
        playIntroAndQuestion()
    }, [])

    return (
        <div className="items-center flex justify-center text-black">
            <div className="bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg rounded-[80px] xl py-8 px-[155px] text-white text-center shadow-3xl">
                <div>
                    <h2 className="text-white font-bold text-6xl">Knowledge Check</h2>
                    <h2 className="text-white font-bold text-2xl mt-5">
                        What is the <strong className="font-semibold text-2xl">“bulb”</strong> on top of a Football Fish’s head for?
                    </h2>
                </div>
                <div className="flex space-x-[120px] items-center mt-6">
                    <div className="w-[420px]">
                        <img src="/images/oceans/angler-fish-2.png" alt="Angler Fish" />
                    </div>
                    <div className="w-[375px]">
                        <QuizForm
                            question={fishQuizData}
                            layout="vertical"
                            onSubmit={handleQuizSubmit}
                            buttonClassName="w-full"
                            disabled={!isReady}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
