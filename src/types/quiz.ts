export type QuizResult = {
    pointsEarned: number
    totalPoints?: number
    isCorrect: boolean
}

export type AudioPaths = {
    correct: string
    incorrect: string
    retry?: string
}
