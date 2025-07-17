"use client";

import {DndProvider, useDrag} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import useTokenStore from "@/store/token-store";
import {useState} from "react";
import OceanFunFactWithDnd from "@/components/interactions/oceans/ocean-fun-fact-with-dnd";

function DragSource() {
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
            <img src="/images/oceans/zooplankton.png" alt=""/>
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

                <div className="fixed right-20 top-[10%] p-4 border-green-1 border-3 rounded-full text-white cursor-pointer h-44 flex items-center w-44" >
                    {
                        !dragEnd && <DragSource />
                    }

                </div>
            </div>
        </DndProvider>
    );
}
