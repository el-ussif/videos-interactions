"use client";
import React, {useCallback, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {v4 as uuidv4} from 'uuid';
import {Button} from "@/components/ui/button";
import LabelsContainer from "@/components/custom-ui/matching-boxes/labels-container";
import DropTarget from "@/components/custom-ui/matching-boxes/drop-target";
import {QuizResult} from "@/types/quiz";

export const ItemTypes = {
    LABEL: 'LABEL',
};

export type MatchItem = {
    id: string;
    visual: React.ReactNode;
    correctLabel: string;
};

export type DragItem = {
    id: string;
    label: string;
    sourceId?: string;
};


interface MatchingBoxesProps {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[],
    disabled?: boolean,
    onSubmitted: (data: QuizResult) => void
}

export default function MatchingBoxes({items, onSubmitted, disabled}: MatchingBoxesProps) {
    const [submitted, setSubmitted] = useState(false)
    const generateLabelItems = useCallback(() => {
        const labels = items.map((item) => item.correctLabel);
        return labels.map((label) => ({
            id: uuidv4(),
            label,
        }));
    }, []);

    const [availableLabels, setAvailableLabels] = useState<DragItem[]>(generateLabelItems());
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [assignments, setAssignments] = useState<any>(
        Object.fromEntries(items.map((item) => [item.id, null]))
    );
    const [showResult, setShowResult] = useState(false);

    const handleDrop = useCallback((targetId: string, droppedItem: DragItem) => {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAssignments((prevAssignments: any) => {
            const updatedAssignments = { ...prevAssignments };

            for (const key in updatedAssignments) {
                if (updatedAssignments[key]?.id === droppedItem.id) {
                    updatedAssignments[key] = null;
                }
            }

            const replacedItem = updatedAssignments[targetId];

            // Update available labels
            setAvailableLabels((prevLabels) => {
                const newLabels = prevLabels.filter((item) => item.id !== droppedItem.id);
                if (replacedItem && !newLabels.find((l) => l.id === replacedItem.id)) {
                    newLabels.push(replacedItem);
                }
                return newLabels;
            });

            // Add source information to the dropped item
            updatedAssignments[targetId] = { ...droppedItem, sourceId: targetId };
            return updatedAssignments;
        });

        setShowResult(false);
    }, []);

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleReturnToLabels = useCallback((item: any) => {
        // Remove from assignments if coming from an item
        if (item.sourceId) {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            setAssignments((prev: any) => ({
                ...prev,
                [item.sourceId]: null
            }));
        }

        // Add to available labels
        setAvailableLabels(prev => [...prev, { id: item.id, label: item.label }]);
        setShowResult(false);
    }, []);

    const handleValidate = () => {
        setShowResult(true);
        const data: QuizResult = {
            pointsEarned: correctCount*10,
            totalPoints: 3*10,
            isCorrect: correctCount===3
        }
        onSubmitted(data)
        setSubmitted(true)
    };

    const correctCount = items.filter(
        (item) => assignments[item.id]?.label === item.correctLabel
    ).length;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className=" mx-auto text-center">
                <div className="">
                    {/* Left column (targets) */}
                    <div className="">
                        <div className="grid grid-cols-3 gap-6">
                            {items.map((item, key) => (
                                <div key={key}>
                                    <DropTarget
                                        key={item.id}
                                        item={item}
                                        assigned={assignments[item.id]}
                                        onDrop={handleDrop}
                                        showResult={showResult}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column (labels) */}
                    <div className="">
                        <LabelsContainer
                            labels={availableLabels}
                            onReturn={handleReturnToLabels}
                        />
                    </div>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                    <Button
                        onClick={handleValidate}
                        disabled={!!availableLabels.length || disabled || submitted}
                        className=""
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </DndProvider>
    );
}

