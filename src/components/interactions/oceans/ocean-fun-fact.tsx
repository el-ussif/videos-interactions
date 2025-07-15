
interface OceanFunFactProps {
    title: string
    description?: string
    fishName?: string
    image: string
}

export default function OceanFunFact({title, fishName, image, description}: OceanFunFactProps) {
    return (
        <>
            <div className="items-center w-full flex text-black">
                <div className="max- w-[540px] px-[50px] py-10 ml-[100px] rounded-[80px] overflow-hidden
     bg-green-1 border border-white/20 shadow-xl">
                    <div className="text-white text-center space-y-6">
                        <h1 className="font-bold text-8xl">
                            {title}
                        </h1>
                        <div className="relative">
                            <div className="mx-auto ">
                                <img
                                    src={image}
                                    alt="Fun fact!"
                                    width={430}
                                    height={250}
                                    className="w-[430px] rounded-xl h-[250px] object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 flex mt-8 text-2xl text-white flex-wrap">
                            <div className="w-full">
                                <h2 className="text-[34px]  font-bold">
                                    {fishName}
                                </h2>
                            </div>
                            <div className=" ">
                                <p className="text-2xl leading-relaxed">
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
