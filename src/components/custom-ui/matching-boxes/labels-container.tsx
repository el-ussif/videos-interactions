"use client"
import { useDrop } from "react-dnd";
import clsx from "clsx";
import {DragItem, ItemTypes} from "@/components/custom-ui/matching-boxes/matching-boxes";
import DraggableLabel from "@/components/custom-ui/matching-boxes/draggable-label";
import {useMemo} from "react";

function LabelsContainer({ labels, onReturn }: {
    labels: DragItem[];
    onReturn: (item: DragItem) => void
}) {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [{ isOver }, drop]:any = useDrop(() => ({
        accept: ItemTypes.LABEL,
        drop: (item: DragItem) => {
            onReturn(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    //Shuffle using Fisher-Yates algorithm
    const shuffledLabels = useMemo(() => {
        // 1. Remove duplicates
        const uniqueLabels = [...new Map(labels.map(item => [item.id, item])).values()];

        // 2. Shuffle using Fisher-Yates algorithm
        const shuffled = [...uniqueLabels];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [labels]);

    return (
        <div
            ref={drop}
            className={clsx(
                "grid grid-cols-3 mt-5 gap-3 rounded-lg min-h-10",
            )}
        >
            {shuffledLabels.map((labelItem) => (
                <div
                    key={labelItem.id}
                    className="rotate-[4deg] transform transition-transform hover:rotate-2"
                >
                    <DraggableLabel item={labelItem} />
                </div>
            ))}
        </div>
    );
}

export default LabelsContainer;
