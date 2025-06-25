import {Button} from "@/components/ui/button";

export default function OceanStopper({ onComplete }: { onComplete?: () => void }) {
    return (
        <div className="items-center w-full flex  text-black">
            <div className="max-w-[500px] px-[50px] ml-[50px] rounded-[80px] overflow-hidden
     bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg">
                <div className="py-16 text-center space-y-6">
                    <div className="relative">
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                            <img
                                src="/images/oceans/carlos-ramirez.png"
                                alt="Carlos Ramirez"
                                width={166}
                                height={166}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 flex mt-16 text-2xl text-primary-1 flex-wrap">
                        <div className="space-y-2">
                            <p className="text-slate-700">
                                <strong className="font-bold text-3xl">
                                    Good job
                                </strong>
                                {" "} learning about the creatures that live deep in our oceans!
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-slate-700">
                                Keep researching on your own. <br/>
                                <strong className="font-bold text-2xl">
                                    You never know what you’ll find!
                                </strong>

                            </p>
                        </div>
                    </div>


                    {/* CTA Button */}
                    {onComplete && (
                        <Button
                            onClick={onComplete}
                            className="w-full mt-16"
                        >
                            Done
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
