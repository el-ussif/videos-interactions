import { useCallback, useState } from "react"
import { playAudio } from "@/lib/utils"
import { AudioPaths, QuizResult } from "@/types/quiz"
import {MAX_ATTEMPTS} from "@/constants/quizz";
import useTokenStore from "@/store/token-store";

interface UseAdvancedQuizHandlerOptions {
    audioPaths: AudioPaths
    onComplete?: () => void
}

export default function useAdvancedQuizHandler({
                                                   audioPaths,
                                                   onComplete,
                                               }: UseAdvancedQuizHandlerOptions) {
    const [isShaking, setIsShaking] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)
    const { addToken } = useTokenStore()

    const handleQuizSubmit = useCallback(
        async (result: QuizResult) => {
            if (result.isCorrect) {
                addToken(result.pointsEarned)
                await playAudio(audioPaths.correct)
                setIsDisabled(true)
                setTimeout(() => {
                    onComplete?.()
                }, 1000)
                return
            }
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500)

            const nextAttempts = attemptsLeft - 1
            setAttemptsLeft(nextAttempts)

            if (nextAttempts <= 0) {
                await playAudio(audioPaths.incorrect)
                setIsDisabled(true)
                setTimeout(() => {
                    onComplete?.()
                }, 1000)
            } else if (audioPaths.retry) {
                setTimeout(() => {
                    playAudio(audioPaths.retry!)
                }, 300)
            }
        },
        [attemptsLeft, audioPaths, onComplete]
    )

    return {
        handleQuizSubmit,
        isShaking,
        isDisabled,
        attemptsLeft,
    }
}
