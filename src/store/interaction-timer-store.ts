import { create } from "zustand";

type GlobalTimerState = {
    elapsedTime: number;
    isRunning: boolean;
    startGlobalTimer: () => void;
    stop: () => void;
    reset: () => void;
};

export const useInteractionTimerStore = create<GlobalTimerState>((set) => {
    let timerInterval: NodeJS.Timeout | null = null;

    return {
        elapsedTime: 0,
        isRunning: false,
        startGlobalTimer: () => {
            if (timerInterval) return; // Ne redémarre pas si déjà en cours
            timerInterval = setInterval(() => {
                set((state) => ({ elapsedTime: state.elapsedTime + 1 }));
            }, 1000);
        },

        stop: () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            set({ isRunning: false });
        },

        reset: () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            set({ elapsedTime: 0, isRunning: false });
        },
    };
});
