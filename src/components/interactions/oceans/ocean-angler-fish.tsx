export default function OceanAnglerFish() {
    return (
        <div className="w-full flex  text-black">
            <div className="relative  w-[480px] px-[42px] py-8 ml-[100px] rounded-[80px] overflow-hidden
     bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="absolute -top-4 left-0">
                    <img className="w-[100px]" src="/images/oceans/bull-left-1.png" alt=""/>
                </div>
                <div className="absolute top-[20%] right-0">
                    <img className="w-[50px]" src="/images/oceans/bull-right-1.png" alt=""/>
                </div>
                <div className="text-center space-y-6">
                    <div className="relative">
                        <div className=" mx-auto rounded-full ">
                            <img
                                src="/images/oceans/angler-fish-2.png"
                                alt="angler-fish-2"
                                width={215}
                                height={200}
                                className="object-cover w-[215px] h-[200px] mx-auto"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 flex mt-8 text-2xl text-white flex-wrap">
                        <div className="w-full">
                            <h2 className="text-3xl  font-bold">
                                Angler (Football) Fish
                            </h2>
                        </div>
                        <div className="space-y-5 text-left">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
                                    Lives at 2,200-3,000 feet
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Lives without any sunlight at all</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
                                    Eats whatever fits in its mouth
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">
                                    Uses its light as a lure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
