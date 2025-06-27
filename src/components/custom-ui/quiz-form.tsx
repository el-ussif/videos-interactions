"use client"

import type React from "react"

import { useState } from "react"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswers: number[]
    points: number
    type: "single" | "multiple"
}

interface QuizFormProps {
    question: QuizQuestion
    layout: "vertical" | "horizontal" | "grid"
    itemsPerRow?: number
    onSubmit: (result: QuizResult) => void
    onReset?: () => void
    className?: string
    buttonClassName?: string
}

interface QuizResult {
    selectedAnswers: number[]
    isCorrect: boolean
    pointsEarned: number
    totalPoints: number
}

export default function QuizForm({
                                     question,
                                     layout,
                                     itemsPerRow = 2,
                                     onSubmit,
                                     className = "",
                                     buttonClassName = "",
                                 }: QuizFormProps) {
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleAnswerChange = (answerIndex: number) => {
        if (hasSubmitted) return

        if (question.type === "single") {
            setSelectedAnswers([answerIndex])
        } else {
            setSelectedAnswers((prev) => {
                if (prev.includes(answerIndex)) {
                    return prev.filter((index) => index !== answerIndex)
                } else {
                    return [...prev, answerIndex]
                }
            })
        }
    }

    const handleSubmit = () => {
        if (selectedAnswers.length === 0) {
            return
        }
        const isCorrect =
            question.correctAnswers.length === selectedAnswers.length &&
            question.correctAnswers.every((answer) => selectedAnswers.includes(answer))

        const pointsEarned = isCorrect ? question.points : 0

        const result: QuizResult = {
            selectedAnswers,
            isCorrect,
            pointsEarned,
            totalPoints: question.points,
        }

        setHasSubmitted(true)
        onSubmit(result)
    }

    const getLayoutClasses = () => {
        switch (layout) {
            case "horizontal":
                return "flex flex-wrap gap-4"
            case "grid":
                return `grid gap-4 grid-cols-1 md:grid-cols-${itemsPerRow}`
            case "vertical":
            default:
                return "grid gap-4 grid-cols-1"
        }
    }

    const getInputType = () => {
        return question.type === "single" ? "radio" : "checkbox"
    }

    console.log("question.correctAnswers", selectedAnswers);
    return (
        <div className={` ${className}`}>
            <div className={`flex flex-col items-center gap-8`}>
                <div className="flex-1 w-full text-black">
                    <div className={getLayoutClasses()}>
                        {question.options.map((option, index) => (
                            <div key={index} className={`transition-all duration-300 hover:cursor-pointer ${selectedAnswers.includes(index) ? 'text-white bg-green-1' : 'bg-white'} rounded-full flex justify-center items-center px-4 py-6`}>
                                <label className="hover:cursor-pointer">
                                    <input
                                        type={getInputType()}
                                        name={question.type === "single" ? "quiz-answer" : `quiz-answer-${index}`}
                                        value={index}
                                        checked={selectedAnswers.includes(index)}
                                        onChange={() => handleAnswerChange(index)}
                                        disabled={hasSubmitted}
                                        className="sr-only"
                                    />
                                    <span className="text-lg font-medium  hover:cursor-pointer  flex-1">
                                        {option}
                                        {
                                            hasSubmitted && question.correctAnswers.includes(index) && (
                                                <span className="ml-2 text-green-300">✓</span>
                                            )
                                        }
                                        {
                                            hasSubmitted &&
                                            selectedAnswers.includes(index) &&
                                            !question.correctAnswers.includes(index) && <span className="ml-2 text-red-300">✗</span>
                                        }
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Selection hint for multiple choice */}
                    {question.type === "multiple" && !hasSubmitted && (
                        <p className="text-sm hidden text-white/70 mt-4 text-center">
                            Select all that apply ({selectedAnswers.length} selected)
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedAnswers.length === 0 || hasSubmitted}
                            className={cn(``, buttonClassName)}
                        >
                            {hasSubmitted ? "Submitted" : "Submit"}
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}
