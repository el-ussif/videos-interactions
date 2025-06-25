import {Button} from "@/components/ui/button";

export default function OceanExpert1({ onComplete }: { onComplete?: () => void }) {
    return (
        <div className="items-center w-full flex  text-black">
            <div className="max-w-[500px] px-[56px] ml-[50px] rounded-[80px] overflow-hidden
     bg-white/30 border border-white/50 shadow-xl backdrop-blur-lg">
                <div className="p-8 text-center space-y-6">
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

                    <div className="space-y-8 flex mt-8 text-xl text-primary-1 flex-wrap">
                        <div className="w-full">
                            <h2 className="text-4xl text-center  font-bold">Carlos Ramirez</h2>
                        </div>

                        <div className="space-y-2">
                            <p className="text-slate-700">
                                <strong className="font-bold text-2xl">Job:</strong> Head of Oceanography Research at
                                Columbia University
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-slate-700">
                                <strong className="font-bold text-2xl">Degrees:</strong> Masters & PhD in Marine Biology
                            </p>
                        </div>
                    </div>


                    {/* CTA Button */}
                    {onComplete && (
                        <Button
                            onClick={onComplete}
                            className="w-full mt-10"
                        >
                            Continue
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
