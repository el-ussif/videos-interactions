"use client"

import QuizForm from "@/components/custom-ui/quiz-form";
import { useEffect, useState } from "react";
import { playAudio } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import useAdvancedQuizHandler from "@/hooks/use-advanced-quiz-handler";

const fishQuizData = {
    id: "football-fish",
    question: 'What is the "bulb" on top of a Football Fish\'s head for?',
    options: [
        "Rising ocean temperatures kill them before adulthood",
        "Overfishing cuts down their population numbers",
        "Seaweed loss reduces food supply",
        "Temperature changes reduce the amount of mating"
    ],
    correctAnswers: [0, 1, 2],
    points: 30,
    type: "multiple" as const,
}

const audioPaths = {
    intro: "/audios/ocean/frame-11-intro.wav",
    question: "/audios/ocean/frame-11-question.wav",
    correct: "/audios/ocean/frame-11-correct-answer.wav",
    incorrect: "/audios/ocean/frame-11-incorrect-answer.wav",
    retry: undefined,
}

export default function KnowledgeCheckQuizJapaneseSpiderCrab({
                                                                 onComplete
                                                             }: {
    onComplete?: () => void
}) {
    const {
        handleQuizSubmit,
        isShaking,
        isDisabled
    } = useAdvancedQuizHandler({
        audioPaths,
        onComplete
    });
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const playIntroAndQuestion = async () => {
            await playAudio(audioPaths.intro);
            setTimeout(async () => {
                await playAudio(audioPaths.question);
                setIsReady(true);
            }, 1000);
        };
        playIntroAndQuestion();
    }, []);

    return (
        <div className="items-center w-full flex justify-center text-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isShaking ? "shake" : "static"}
                    initial={isShaking ? { x: -10 } : false}
                    animate={isShaking ? { x: [0, -10, 10, -8, 8, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className="bg-white/30 w-full max-w-[1140px] border border-white/50 shadow-xl backdrop-blur-lg rounded-[80px] py-8 px-[90px] text-white text-center shadow-3xl"
                >
                    <div>
                        <h2 className="text-white font-bold mt-6 text-6xl">
                            Knowledge Check
                        </h2>
                        <h2 className="text-white font-bold text-2xl mt-5">
                            In what ways are climate change and human behavior harming Japanese Spider Crabs?
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
                                disabled={!isReady || isDisabled}
                            />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
