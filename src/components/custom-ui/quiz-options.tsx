"use client"

interface QuizOption {
    text: string
    index: number
}

interface QuizOptionsProps {
    options: QuizOption[]
    selectedAnswer: string
    onAnswerChange: (value: string) => void
    hasSubmitted: boolean
    correctAnswer: number
    layout: "vertical" | "horizontal" | "grid"
    disabled?: boolean
}

export default function QuizOptions({
                                        options,
                                        selectedAnswer,
                                        onAnswerChange,
                                        hasSubmitted,
                                        correctAnswer,
                                        layout,
                                        disabled = false,
                                    }: QuizOptionsProps) {
    const getLayoutClasses = () => {
        switch (layout) {
            case "vertical":
                return "space-y-4"
            case "horizontal":
                return "flex flex-wrap gap-4"
            case "grid":
                return "grid grid-cols-1 md:grid-cols-2 gap-4"
            default:
                return "space-y-4"
        }
    }

    const getOptionClasses = (index: number) => {
        const baseClasses = `
      flex items-center w-full p-4 rounded-full cursor-pointer transition-all duration-200 text-center justify-center
      ${selectedAnswer === index.toString() ? "bg-white/20 ring-2 ring-white" : "bg-white/10 hover:bg-white/15"}
      ${hasSubmitted && index === correctAnswer ? "bg-green-500/30 ring-2 ring-green-400" : ""}
      ${
            hasSubmitted && selectedAnswer === index.toString() && index !== correctAnswer
                ? "bg-red-500/30 ring-2 ring-red-400"
                : ""
        }
      ${hasSubmitted || disabled ? "cursor-not-allowed" : "cursor-pointer"}
    `

        // Special styling for the first option in grid layout (turquoise)
        if (layout === "grid" && index === 0 && !hasSubmitted) {
            return baseClasses.replace("bg-white/10", "bg-teal-500").replace("hover:bg-white/15", "hover:bg-teal-600")
        }

        return baseClasses
    }

    return (
        <div className={getLayoutClasses()}>
            {options.map((option) => (
                <div key={option.index}>
                    <label className={getOptionClasses(option.index)}>
                        <input
                            type="radio"
                            name="quiz-answer"
                            value={option.index.toString()}
                            checked={selectedAnswer === option.index.toString()}
                            onChange={(e) => !hasSubmitted && !disabled && onAnswerChange(e.target.value)}
                            disabled={hasSubmitted || disabled}
                            className="sr-only"
                        />
                        <span className="text-lg font-medium text-white flex-1">
              {option.text}
                            {hasSubmitted && option.index === correctAnswer && <span className="ml-2 text-green-300">✓</span>}
                            {hasSubmitted && selectedAnswer === option.index.toString() && option.index !== correctAnswer && (
                                <span className="ml-2 text-red-300">✗</span>
                            )}
            </span>
                    </label>
                </div>
            ))}
        </div>
    )
}
