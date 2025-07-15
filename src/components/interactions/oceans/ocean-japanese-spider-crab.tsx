export default function OceanJapaneseSpiderCrab() {
    return (
        <div className="items-center  flex  justify-end text-black">
            <div className="relative w-[486px] px-[40px] py-5 ml-[100px] rounded-[80px] overflow-hidden
     bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="absolute -top-4 left-0">
                    <img className="w-[130px]" src="/images/oceans/bull-left-1.png" alt=""/>
                </div>
                <div className="absolute top-0 right-12">
                    <img className="w-[130px]" src="/images/oceans/bull-right-2.png" alt=""/>
                </div>
                <div className="py-8 text-center space-y-6">
                    <div className="relative">
                        <div className="mx-auto rounded-full ">
                            <img
                                src="/images/oceans/japanese-spider-crab-2.png"
                                alt="Carlos Ramirez"
                                width={340}
                                height={195}
                                className="mx-auto w-[340px] h-[195px] object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 flex mt-4 text-2xl text-white flex-wrap">
                        <div className="w-full">
                            <h2 className="text-[34px] font-bold">
                                Japanese Spider Crab
                            </h2>
                        </div>
                        <div className="space-y-5 text-[24px] text-left">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 mt-2.5 bg-white  flex-shrink-0"></div>
                                <p className="">
                                    Lives 660-1,800 feet underwater near Japan
                                </p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 mt-2.5 bg-white  flex-shrink-0"></div>
                                <p className="">
                                    Can grow to be 12 feet wide
                                </p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 mt-2.5 bg-white  flex-shrink-0"></div>
                                <p className="">
                                    Feeds on dead fish
                                </p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 mt-2.5 bg-white  flex-shrink-0"></div>
                                <p className="">
                                    Heavily impacted by hunting and climate change
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
