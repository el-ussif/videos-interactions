export default function OceanJapaneseSpiderCrab() {
    return (
        <div className="items-center w-full flex  justify-end text-black">
            <div className="relative max-w-[480px] px-[45px] py-7 mr-[50px] rounded-[80px] overflow-hidden
     bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="absolute -top-4 left-0">
                    <img className="w-[130px]" src="/images/oceans/bull-left-1.png" alt=""/>
                </div>
                <div className="absolute top-0 right-12">
                    <img className="w-[130px]" src="/images/oceans/bull-right-2.png" alt=""/>
                </div>
                <div className="py-8 text-center space-y-6">
                    <div className="relative">
                        <div className="px-6 mx-auto rounded-full ">
                            <img
                                src="/images/oceans/japanese-spider-crab-2.png"
                                alt="Carlos Ramirez"
                                width={166}
                                height={166}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 flex mt-6 text-2xl text-white flex-wrap">
                        <div className="w-full">
                            <h2 className="text-3xl font-bold">
                                Japanese Spider Crab
                            </h2>
                        </div>
                        <div className="space-y-5  px-9 text-left">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
                                    Lives 660-1,800 feet underwater near Japan
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
                                    Can grow to be 12 feet wide
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
                                    Feeds on dead fish
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
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
