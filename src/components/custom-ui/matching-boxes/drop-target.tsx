import {useDrop} from "react-dnd";
import DraggableLabel from "@/components/custom-ui/matching-boxes/draggable-label";
import React from "react";
import {DragItem, ItemTypes, MatchItem} from "@/components/custom-ui/matching-boxes/matching-boxes";

export default function DropTarget({ item, assigned, onDrop,}: {
    item: MatchItem;
    assigned: DragItem | null;
    onDrop: (id: string, item: DragItem) => void;
    showResult: boolean;
}) {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [{  }, drop]: any = useDrop(() => ({
        accept: ItemTypes.LABEL,
        drop: (droppedItem: DragItem) => onDrop(item.id, droppedItem),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className="flex w-full flex-wrap items-center gap-4 mt-4">
            <div className="max- h-[175px]">
                <img className="h-[160px]" src={item.visual as string} alt={item.correctLabel}/>
            </div>
            <div className="w-full">
                {assigned ? (
                    <DraggableLabel item={assigned} />
                ) : (
                    <div className="w-full bg-transparent border border-dashed border-black min-h-14 rounded-full"></div>
                )}
            </div>
        </div>
    );
}

