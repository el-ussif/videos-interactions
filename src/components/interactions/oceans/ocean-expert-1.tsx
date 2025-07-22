import {Button} from "@/components/ui/button";

export default function OceanExpert1({ onComplete,   disabled = false,
                                     }: { onComplete?: () => void,   disabled?: boolean;
}) {
    return (
        <div className="items-center w-full flex justify-end text-black">
            <div className="bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg w-[530px] px-[56px] mr-[100px]  rounded-[80px] overflow-hidden
     bg-white /30 shadow-xl backdrop-saturate-xl [20%]">
                <div className="px-8 py-16 text-center space-y-6">
                    <div className="relative">
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                            <img
                                src="/images/oceans/carlos-ramirez-1.png"
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


                    {onComplete && (
                        <Button
                            onClick={onComplete}
                            disabled={disabled}
                            className={`w-full mt-10 ${
                                disabled ? "bg-white text-black cursor-not-allowed opacity-60" : ""
                            }`}
                        >
                            Continue
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
