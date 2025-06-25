"use client"

import {Button} from "@/components/ui/button";

export default function OceanStarter({ onComplete }: { onComplete?: () => void }) {
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Ocean gradient background */}
            <div className="bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg border-white/50 border rounded-[80px] xl p-8 text-white text-center shadow-3xl">
                {/* Title */}
                <h1 className="text-5xl font-bold mb-8 text-white">Objective</h1>

                {/* Description */}
                <div className="mb-12 space-y-2">
                    <p className="text-xl font-medium">
                        Identify <span className="font-bold">three</span> fish species that live in the depths of{" "}
                        <span className="font-bold">our oceans</span>.
                    </p>
                    <p className="text-lg opacity-90">Can you discover the name of each fish?</p>
                </div>

                {/* Fish illustrations */}
                <div className="flex justify-center items-center gap-x-[67px] mb-12">
                    {/* Anglerfish */}
                    <div className="w-[180px] h-[180px] bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="scale-[125%]">
                            <img src="/images/oceans/angle-fish.png" alt=""/>
                        </div>
                    </div>

                    {/* Deep sea creature */}
                    <div className="w-[180px] h-[180px] bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="scale-[125%]">
                            <img src="/images/oceans/japanese-spider-crab.png" alt=""/>
                        </div>
                    </div>

                    {/* Another fish */}
                    <div className="w-[180px] h-[180px] bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="scale-[125%]">
                            <img src="/images/oceans/barrel-eye-fish.png" alt=""/>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                {onComplete && (
                    <Button
                        onClick={onComplete}
                        className=""
                    >
                        {"Let's Get Started"}
                    </Button>
                )}

                {/* Decorative wave effect */}
                <div className="hidden bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-800/50 to-transparent rounded-b-3xl"></div>
            </div>
        </div>
    )
}
