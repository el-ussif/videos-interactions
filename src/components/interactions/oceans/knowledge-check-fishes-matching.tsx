"use client"

import MatchingBoxes from "@/components/custom-ui/matching-boxes/matching-boxes"
import React, { useEffect, useState } from "react"
import { playAudio } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import useAdvancedQuizHandler from "@/hooks/use-advanced-quiz-handler"

const data = [
    { id: "1", visual: "/images/oceans/angler-fish-2.png", correctLabel: "Football Fish" },
    { id: "2", visual: "/images/oceans/japanese-spider-crab-2.png", correctLabel: "Japanese Spider Crab" },
    { id: "3", visual: "/images/oceans/barrel-eye-fish-2.png", correctLabel: "Barreleye Fish" },
]

const audioPaths = {
    intro: "/audios/ocean/frame-12-intro.wav",
    question: "/audios/ocean/frame-12-question.wav",
    correct: "/audios/ocean/frame-12-correct-answer.wav",
    incorrect: "/audios/ocean/frame-12-incorrect-answer.wav",
    retry: undefined, // optional
}

export default function KnowledgeCheckFishesMatching({ onComplete }: { onComplete?: () => void }) {
    const [isReady, setIsReady] = useState(false)

    const {
        handleQuizSubmit,
        isShaking,
        isDisabled,
    } = useAdvancedQuizHandler({
        audioPaths,
        onComplete,
    })

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
        <div className="items-center w-full flex justify-center text-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isShaking ? "shake" : "static"}
                    initial={isShaking ? { x: -10 } : false}
                    animate={isShaking ? { x: [0, -10, 10, -8, 8, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className="bg-white/30 max-w-[1140px] border border-white/50 shadow-xl backdrop-blur-lg rounded-[80px] py-8 px-[90px] text-white text-center shadow-3xl"
                >
                    <div>
                        <h2 className="font-bold mt-6 text-6xl">Knowledge Check</h2>
                        <h2 className="text-2xl mt-5">Drag and drop each one to correct the name.</h2>
                    </div>

                    <div className="flex space-x-[120px] items-center mt-8">
                        <MatchingBoxes
                            items={data}
                            onSubmitted={handleQuizSubmit}
                            disabled={!isReady || isDisabled}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
