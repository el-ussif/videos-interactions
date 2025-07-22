import {Button} from "@/components/ui/button";
import useTokenStore from "@/store/token-store";
import {useState} from "react";

export default function OceanStopper({ disabled = false, onComplete }: { onComplete?: () => void, disabled?: boolean }) {
    const { addToken } = useTokenStore()
    const [tokenIsAdded, setTokenIsAdded] = useState(false)
    const getInteractivityToken = () => {
        if (onComplete) {
            setTokenIsAdded(true)
            addToken(30)
            onComplete()
        }
    }

    return (
        <div className="items-center  w-full max-w-6x flex  justify-end text-black">
            <div className="max-w-[600px] w-[530px] px-[50px] mr-[100px] rounded-[80px] overflow-hidden
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
                                    {"You never know what you’ll find!"}
                                </strong>

                            </p>
                        </div>
                    </div>


                    {/* CTA Button */}
                    {onComplete && (
                        <Button
                            disabled={tokenIsAdded || disabled}
                            onClick={getInteractivityToken}
                            className={`w-full mt-16 ${
                                disabled ? "bg-white text-black cursor-not-allowed opacity-60" : ""
                            }`}
                        >
                            Done
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
