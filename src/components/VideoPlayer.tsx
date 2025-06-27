"use client";

import { useEffect, useRef, useState } from "react";
import { videos } from "@/data/videos";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoIndex, setVideoIndex] = useState(0);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentInteraction, setCurrentInteraction]: any = useState<null | any>(null);
    const [displayedTimecodes, setDisplayedTimecodes] = useState<number[]>([]);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
    const [progress, setProgress] = useState(0);
    const [hoverControls, setHoverControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const currentVideo = videos[videoIndex];

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        setCurrentInteraction(null);
        setDisplayedTimecodes([]);
        if (interactionTimeout) clearTimeout(interactionTimeout);
    }, [videoIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            const video = videoRef.current;
            if (!video) return;

            const currentTime = Math.floor(video.currentTime);

            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            const interactionToTrigger:any = currentVideo.interactions.find(
                (i) =>
                    Math.floor(i.timecode) === currentTime &&
                    !displayedTimecodes.includes(i.timecode)
            );

            if (interactionToTrigger) {
                setDisplayedTimecodes((prev) => [...prev, interactionToTrigger.timecode]);

                // Blocking interaction with preview duration
                if (interactionToTrigger.blocking && interactionToTrigger?.previewDuration) {
                    setCurrentInteraction({
                        ...interactionToTrigger,
                        state: "preview",
                    });

                    const timeout = setTimeout(() => {
                        video.pause();
                        setCurrentInteraction({
                            ...interactionToTrigger,
                            state: "blocking",
                        });
                    }, interactionToTrigger?.previewDuration * 1000);

                    setInteractionTimeout(timeout);
                }

                // Blocking interaction without preview
                else if (interactionToTrigger.blocking) {
                    if (!interactionToTrigger.loop) {
                        video.pause();
                    }
                    setCurrentInteraction({
                        ...interactionToTrigger,
                        state: "blocking",
                    });
                }
                // Non-blocking interaction
                else {
                    setCurrentInteraction({
                        ...interactionToTrigger,
                        state: "preview",
                    });

                    const timeout = setTimeout(() => {
                        setCurrentInteraction(null);
                    }, (interactionToTrigger.duration || 5) * 1000);

                    setInteractionTimeout(timeout);
                }
            }
        }, 300);

        return () => clearInterval(interval);
    }, [currentVideo, currentInteraction, displayedTimecodes]);

    useEffect(() => {
        let animationFrame: number;

        const updateProgress = () => {
            const video = videoRef.current;
            if (video && video.duration) {
                const playedDuration = videos
                    .slice(0, videoIndex)
                    //eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .reduce((acc, v) => acc + video.duration, 0) + video.currentTime;

                const totalDuration = videos
                    .slice(0, videos.length - 1)
                    //eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .reduce((acc, v) => acc + video.duration, 0);

                setProgress(Math.min(playedDuration / totalDuration, 1));
            }
            animationFrame = requestAnimationFrame(updateProgress);
        };

        if (hasUserInteracted) {
            animationFrame = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [hasUserInteracted, videoIndex]);

    useEffect(() => {
        videos.slice(videoIndex + 1).forEach((v) => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "video";
            link.href = v.src;
            document.head.appendChild(link);
        });
    }, [videoIndex]);


    const handleInteractionComplete = () => {
        if (currentInteraction?.canGoNext) {
            handleEnded()
            return;
        }
        setCurrentInteraction(null);
        if (videoRef.current?.paused) {
            videoRef.current.play();
        }
    };

    const handleEnded = () => {
        if (videoIndex < videos.length - 1) {
            setVideoIndex(videoIndex + 1);
        }
    };

    const handleUserStart = () => {
        setHasUserInteracted(true);
        setTimeout(() => {
            const video = videoRef.current;
            const audio = audioRef.current;
            if (video) {
                video.muted = false;
                video.volume = 1;
                video.play().catch(console.error);
            }
            if (audio) {
                audio.volume = .9;
                audio.play().catch(console.error);
            }
        }, 100);
    };

    useEffect(() => {
        let animationFrame: number;

        const updateProgress = () => {
            const video = videoRef.current;
            if (video && video.duration) {
                const playedDuration = videos
                    .slice(0, videoIndex)//eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .reduce((acc, v) => acc + video.duration, 0) + video.currentTime;

                const totalDuration = videos
                    .slice(0, videos.length - 1)//eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .reduce((acc, v) => acc + video.duration, 0);

                setProgress(Math.min(playedDuration / totalDuration, 1));
            }
            animationFrame = requestAnimationFrame(updateProgress);
        };

        if (hasUserInteracted) {
            animationFrame = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [hasUserInteracted, videoIndex]);

    useEffect(() => {
        videos.slice(videoIndex + 1).forEach((v) => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "video";
            link.href = v.src;
            document.head.appendChild(link);
        });
    }, [videoIndex]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video || currentInteraction?.blocking) return;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    return (
        <div className="fixed inset-0 bg-black z-50">
            {!hasUserInteracted ? (
                <div className="flex items-center justify-center h-full">
                    <button
                        onClick={handleUserStart}
                        className="bg-white text-black px-6 py-3 rounded text-xl hover:bg-gray-200 transition"
                    >
                        ▶️ Lancer la vidéo
                    </button>
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <video
                        ref={videoRef}
                        src={currentVideo.src}
                        loop={currentInteraction?.loop}
                        controls={false}
                        autoPlay
                        playsInline
                        muted={false}
                        className="w-full h-full object-cover"
                        onEnded={handleEnded}
                    />

                    <div
                        key="interaction"
                        className={`absolute inset-0 flex items-center justify-center z-50 ${
                            currentInteraction?.blocking ? "bg-black/70 pointer-events-auto" : "pointer-events-none"
                        }`}
                    >
                        {currentInteraction?.component({
                            onComplete: handleInteractionComplete,
                            disabled:
                                currentInteraction?.blocking &&
                                currentInteraction?.state === "preview",
                        })}
                    </div>

                    <div className="absolute bottom-0 w-full z-50 h-24">
                        <div
                            className="w-full h-full"
                            onMouseEnter={() => setHoverControls(true)}
                            onMouseLeave={() => setHoverControls(false)}
                        >
                            <AnimatePresence>
                                {hoverControls && (
                                    <motion.div
                                        key="controls"
                                        initial={{opacity: 0, y: 100}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: 100}}
                                        transition={{duration: 0.3}}
                                        className="bg-black/60 text-white"
                                    >
                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-gray-700 rounded mb-3 relative">
                                            <div
                                                className="h-full bg-white/60 rounded pointer-events-none"
                                                style={{width: `${progress * 100}%`}}
                                            />
                                        </div>

                                        {/* Controls */}
                                        <div className="w-full flex justify-between px-6 pt-2 pb-4 items-center">
                                            <div className="flex space-x-8">
                                                <button
                                                    onClick={togglePlay}
                                                    className={`text-white ${
                                                        currentInteraction?.blocking
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : "hover:cursor-pointer"
                                                    } bg-[#DBE2EA]/40 h-[64px] w-[64px] rounded-full items-center justify-center flex transition`}
                                                    disabled={currentInteraction?.blocking}
                                                >
                                                    {videoRef.current?.paused ? <Play/> : <Pause/>}
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    const video = videoRef.current;
                                                    if (!video) return;
                                                    video.muted = !video.muted;
                                                }}
                                                className="text-white hover:cursor-pointer bg-[#DBE2EA]/40 h-[64px] w-[64px] rounded-full items-center justify-center flex transition"
                                            >
                                                {videoRef.current?.muted ? <VolumeX/> : <Volume2/>}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => alert("On closing app")}
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.3}}
                        className="fixed top-4 left-4 text-white bg-[#DBE2EA]/40 h-[55px] w-[55px] rounded-full items-center justify-center flex z-50"
                    >
                        <X/>
                    </motion.button>

                    <AnimatePresence>
                        {!hoverControls && (
                            <motion.button
                                key="token"
                                initial={{opacity: 0, x: 100}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 100}}
                                transition={{duration: 0.3}}
                                className="fixed min-w-[150px] z-100 top-6 right-4 text-white bg-[#DBE2EA]/40 flex rounded-full items-center justify-center"
                            >
                                <img className="w-[54px]" src="/images/globe-kin-gem.png" alt=""/>
                                <span className="w-full font-bold text-xl justify-center">500</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <audio
                ref={audioRef}
                src="/audios/ocean-loop.mp3"
                autoPlay
                loop
                hidden
            />
        </div>
    );
}
