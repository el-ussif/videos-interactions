"use client";

import {DndProvider, useDrag} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import useTokenStore from "@/store/token-store";
import {useState} from "react";
import OceanFunFactWithDnd from "@/components/interactions/oceans/ocean-fun-fact-with-dnd";
import { motion } from "framer-motion";

function DragSource() {
    //eslint-disable-next-line
    const [{ isDragging }, dragRef]:any = useDrag(() => ({
        type: "FISH_DROP",
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={dragRef}
            className={`cursor-pointer ${
                isDragging ? "opacity-20" : "opacity-100"
            }`}
        >
            <img className="w-s[200px]" src="/images/oceans/zooplankton.png" alt=""/>
        </div>
    );
}

export default function OceanBarrelEyeFishFunFact() {
    const {addToken} = useTokenStore()
    const [dragEnd, setDragEnd] = useState(false)

    function dragAndDropEnd() {
        if (!dragEnd) {
            addToken(10)
            setDragEnd(true)
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full">
                <OceanFunFactWithDnd
                    image={"/images/oceans/barrel-eye-fish-2.png"}
                    title={"Fun Fact!"}
                    imageClassName={"w-[460px] p-5 h-[100%] scale-x-[-1]"}
                    fishName={"Barreleye Fish"}
                    description={"They have only been seen a handful of times"}
                    dragAndDropEnd={dragAndDropEnd}
                />

                {!dragEnd && (
                    <motion.img
                        src="/images/oceans/dnd-hand-tool.png"
                        alt="drag hand"
                        className="fixed w-[100px] z-50 pointer-events-none"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                            x: [0, -(window.innerWidth - 630), 0], // 600px vers la gauche, puis revient
                            y: [10, 250, 0], // 200px vers le haut, puis revient
                            opacity: [1, 1, 1, 0], // disparaît à la fin // disparaît à la fin
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: 3,
                            repeatType: "loop",
                            onComplete: () => console.log("animation completed"),
                        }}
                        style={{ right: "130px", top: "10%" }}
                    />
                )}
                {
                    !dragEnd && (
                        <div
                            className="fixed right-[80px] top-[10%] p-4 border-green-1 border-3 rounded-full text-white cursor-pointer h-36 flex items-center w-36">
                            <DragSource/>
                        </div>
                    )
                }
            </div>
        </DndProvider>
    );
}
