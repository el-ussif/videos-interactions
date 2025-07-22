export default function OceanBarrelEyeFish() {
    return (
        <div className="items-center w-full flex text-black">
            <div className="max-w-[490px] px-[42px] py-12 ml-[100px] rounded-[80px] overflow-hidden
     bg-white/10 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="flex flex-wrap w-full justify-center text-center space-y-6">
                    <div className="relative">
                        <div className=" mx-auto rounded-full ">
                            <img
                                src="/images/oceans/barrel-eye-fish-2.png"
                                alt="Barreleye Fish"
                                width={350}
                                height={175}
                                className="w-[350px] h-full object-cover scale-x-[-1]"
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
                            <div className="flex items-start space-x-3">
                                <div className="w-4 h-4 mt-1.5 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Transparent head</p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-4 h-4 mt-1.5 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Two bright green eyes</p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-4 h-4 mt-1.5 bg-white rounded-full flex-shrink-0"></div>
                                <p className="text-lg">Lives around 2,000-2,600 feet underwater</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
