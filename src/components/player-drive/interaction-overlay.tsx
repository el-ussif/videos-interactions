import { motion, AnimatePresence } from "framer-motion";

//eslint-disable-next-line
export default function InteractionOverlay({ currentInteraction, onComplete }: any) {
    return (
        <AnimatePresence>
            {currentInteraction && (
                <motion.div
                    key={`interaction-${currentInteraction?.timecode}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`absolute inset-0 flex items-center justify-center z-50 ${
                        currentInteraction.blocking && currentInteraction.blockingBg ? "bg-black/50 pointer-events-auto" : ""
                    }`}
                >
                    {currentInteraction.component?.({
                        onComplete,
                        disabled: currentInteraction?.blocking && currentInteraction?.state === "preview",
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
