import {AudioPaths, QuizResult} from "@/types/quiz";
import useTokenStore from "@/store/token-store";
import {useCallback} from "react";
import {playAudio} from "@/lib/utils";

export default function useQuizAudioHandler(audioPaths: AudioPaths, onComplete?: () => void) {
    const { addToken } = useTokenStore()

    const handleQuizSubmit = useCallback(
        async (result: QuizResult) => {
            console.log(`Points earned: ${result.pointsEarned}/${result.totalPoints}`)
            console.log(`Answer ${result.isCorrect ? "correct" : "incorrect"}`)

            addToken(result.pointsEarned)

            if (result.isCorrect) {
                await playAudio(audioPaths.correct)
            } else {
                await playAudio(audioPaths.incorrect)
            }

            if (onComplete) {
                setTimeout(onComplete, 1000)
            }
        },
        [addToken, audioPaths, onComplete]
    )

    return handleQuizSubmit
}
