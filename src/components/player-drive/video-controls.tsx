import { AnimatePresence, motion } from "framer-motion";
import { Play, VolumeX } from "lucide-react";

type Props = {
    hoverControls: boolean;
    progress: number;
    onPlayPause: () => void;
    isPaused: boolean;
    onMuteToggle: () => void;
    isMuted: boolean;
    blocking: boolean;
};

export default function VideoControls({
                                          hoverControls,
                                          progress,
                                          onPlayPause,
                                          isPaused,
                                          onMuteToggle,
                                          isMuted,
                                          blocking,
                                      }: Props) {
    return (
        <AnimatePresence>
            {hoverControls && (
                <motion.div
                    key="controls"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black/60 text-white"
                >
                    <div className="w-full h-2 bg-gray-700 rounded mb-3 relative">
                        <div
                            className="h-full bg-white/60 rounded pointer-events-none"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>

                    <div className="w-full flex justify-between px-6 pb-4 items-center">
                        <button
                            onClick={onPlayPause}
                            className={`text-white ${
                                blocking ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
                            }   bg-primary/90 hover:bg-primary h-[60px] w-[60px] rounded-full items-center justify-center flex transition`}
                        >
                            {isPaused ? <Play size={32} /> : <img alt="" width={20} height={27} src="/images/pause.png" />}
                        </button>

                        <button
                            onClick={onMuteToggle}
                            className="text-white hover:cursor-pointer bg-primary/90 hover:bg-primary h-[60px] w-[60px] rounded-full items-center justify-center flex transition"
                        >
                            {isMuted ? (
                                <VolumeX />
                            ) : (
                                <img src="/images/volume-on.png" alt="" width={32} height={32} />
                            )}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
