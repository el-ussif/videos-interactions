"use client"

import MatchingBoxes from "@/components/custom-ui/matching-boxes/matching-boxes";
import React from "react";


export default function KnowledgeCheckFishesMatching({ onComplete }: { onComplete?: () => void }) {
    const data = [
        { id: '1', visual: '/images/oceans/angler-fish-2.png', correctLabel: 'Football Fish' },
        { id: '2', visual: '/images/oceans/japanese-spider-crab-2.png', correctLabel: 'Japanese Spider Crab' },
        { id: '3', visual: '/images/oceans/barrel-eye-fish-2.png', correctLabel: 'Barreleye Fish' },
    ];

    const handleMatchingBoxSubmit = (result: {
        correctCount: number,
        total: number,
    }) => {
        console.log(`Points earned: ${result.correctCount}/${result.total}`)
        if (onComplete) {
            onComplete()
        }
    }

    return (
        <div className="items-center w-full max-w-[1140px] flex  justify-center text-black">
            <div className="bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg border-white/50 border rounded-[80px] xl py-8 px-[90px] text-white text-center shadow-3xl">
                <div>
                    <h2 className="font-bold mt-6 text-6xl">
                        Knowledge Check
                    </h2>
                    <h2 className="text-2xl mt-5">
                        Drag and drop each one to correct the name.
                    </h2>
                </div>
                <div className="flex space-x-[120px] items-center mt-8">
                    <MatchingBoxes
                        items={data}
                        onSubmitted={handleMatchingBoxSubmit}
                    />
                </div>
            </div>
        </div>
    )
}
