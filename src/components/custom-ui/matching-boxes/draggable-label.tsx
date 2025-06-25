import {useDrag} from "react-dnd";
import clsx from "clsx";
import React from "react";
import {DragItem, ItemTypes} from "@/components/custom-ui/matching-boxes/matching-boxes";


export default function DraggableLabel({item}: { item: DragItem }) {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [{isDragging}, drag]: any = useDrag(() => ({
        type: ItemTypes.LABEL,
        item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={clsx(
                'px-4 py-2 rounded-full shadow cursor-move font-medium transition-opacity border bg-white text-gray-800',
                isDragging ? 'opacity-50' : 'opacity-100'
            )}
        >
            {item.label}
        </div>
    );
}
