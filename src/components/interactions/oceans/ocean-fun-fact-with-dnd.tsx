import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface OceanFunFactProps {
    title: string;
    description?: string;
    fishName?: string;
    imageClassName?: string;
    image: string;
    imageRef?: any;
    dragAndDropEnd?: VoidFunction
}

export default function OceanFunFactWithDnd({
                                         title,
                                         fishName,
                                         image,
                                         description,
                                         imageClassName,
                                         imageRef,
                                         dragAndDropEnd,
                                     }: OceanFunFactProps) {
    const controls = useAnimation();
    const [, setIsDropped] = useState(false);

    const [, dropRef]: any = useDrop(() => ({
        accept: "FISH_DROP",
        drop: () => {
            setIsDropped(true);
            controls.start({
                x: [0, -15, 15, -10, 10, 0],
                transition: { duration: 0.6 },
            });
            if (dragAndDropEnd) {
                dragAndDropEnd()
            }
        },
    }));

    return (
        <div className="items-center w-full flex text-black">
            <div
                className="w-[490px] px-[50px] py-10 ml-[100px] rounded-[70px] overflow-hidden bg-green-1/75 border border-white/20 shadow-xl"
            >
                <div className="text-white text-center space-y-6">
                    <h1 className="font-bold text-7xl">{title}</h1>
                    <div className="relative">
                        <div
                            className="mx-auto flex justify-center items-center"
                            ref={(el:any) => {
                                dropRef(el);
                                if (imageRef?.current) imageRef.current = el;
                            }}
                        >
                            <motion.img
                                animate={controls}
                                src={image}
                                alt="Fun fact!"
                                className={cn(
                                    "w-[430px] rounded-xl h-[250px] object-cover",
                                    imageClassName
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 flex mt-8 text-2xl text-white flex-wrap">
                        <div className="w-full">
                            <h2 className="text-[34px] font-bold">{fishName}</h2>
                        </div>
                        <div>
                            <p className="text-2xl leading-relaxed">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
