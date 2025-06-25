
interface OceanFunFactProps {
    title: string
    description?: string
    fishName?: string
    image: string
}

export default function OceanFunFact({title, fishName, image, description}: OceanFunFactProps) {
    return (
        <>
            <div className="items-center w-full flex  justify-end text-black">
                <div className="max-w-[552px] px-[56px] py-14 mr-[50px] rounded-[80px] overflow-hidden
     bg-green-1 border border-white/20 shadow-xl">
                    <div className="text-white text-center space-y-6">
                        <h1 className="font-bold text-8xl">
                            {title}
                        </h1>
                        <div className="relative">
                            <div className=" mx-auto rounded-full ">
                                <img
                                    src={image}
                                    alt="Fun fact!"
                                    width={166}
                                    height={166}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-8 flex mt-8 text-2xl text-white flex-wrap">
                            <div className="w-full">
                                <h2 className="text-3xl  font-bold">
                                    {fishName}
                                </h2>
                            </div>
                            <div className="px-12 ">
                                <p className="text-xl leading-relaxed">
                                {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
