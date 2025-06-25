export default function OceanBarrelEyeFish() {
    return (
        <div className="items-center w-full flex  justify-end text-black">
            <div className="max-w-[480px] px-[42px] py-12 mr-[50px] rounded-[80px] overflow-hidden
     bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="p-8 text-center space-y-6">
                    <div className="relative">
                        <div className=" mx-auto rounded-full ">
                            <img
                                src="/images/oceans/barrel-eye-fish-2.png"
                                alt="Carlos Ramirez"
                                width={166}
                                height={166}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 flex mt-8 text-2xl text-white flex-wrap">
                        <div className="w-full">
                            <h2 className="text-3xl  font-bold">
                                Barreleye Fish
                            </h2>
                        </div>
                        <div className="space-y-5 text-left">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Transparent head</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Two bright green eyes</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Lives around 2,000-2,600 feet underwater</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
