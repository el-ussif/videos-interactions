"use client";

import { useEffect, useRef, useState } from "react";
import { videos } from "@/data/videos";
import { Play, VolumeX, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useTokenStore from "@/store/token-store";
import { useInteractionTimerStore } from "@/store/interaction-timer-store";

export default function VideoPlayer() {
    // eslint-disable-next-line
    const videoRef = useRef<any>(null);
    const [videoIndex, setVideoIndex] = useState(0);
    const [currentInteraction, setCurrentInteraction] = useState<null | any>(null);
    const [displayedTimecodes, setDisplayedTimecodes] = useState<number[]>([]);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
    const [progress, setProgress] = useState(0);
    const [hoverControls, setHoverControls] = useState(false);
    const [areVideosReady, setAreVideosReady] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const currentVideo = videos[videoIndex];
    const { token } = useTokenStore();
    const { startGlobalTimer } = useInteractionTimerStore.getState();
    const videoCache = useRef<Map<string, Blob>>(new Map());

    // Préchargement complet des vidéos
    useEffect(() => {
        const preloadVideos = async () => {
            try {
                const totalVideos = videos.length;
                let loadedCount = 0;

                for (const video of videos) {
                    try {
                        // Vérifier d'abord si la vidéo est déjà en cache
                        if (!videoCache.current.has(video.src)) {
                            const response = await fetch(video.src);
                            const blob = await response.blob();
                            videoCache.current.set(video.src, blob);
                        }

                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / totalVideos) * 100));
                    } catch (error) {
                        console.error(`Error loading video ${video.src}:`, error);
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / totalVideos) * 100));
                    }
                }

                setAreVideosReady(true);
                console.log("All videos preloaded and cached");
            } catch (error) {
                console.error("Error in preloading:", error);
                setAreVideosReady(true);
            }
        };

        preloadVideos();

        return () => {
            videoCache.current.clear();
        };
    }, []);

    // Gestion du changement de vidéo
    useEffect(() => {
        if (!hasUserInteracted || !areVideosReady || !videoRef.current) return;

        const playCurrentVideo = async () => {
            try {
                const cachedBlob = videoCache.current.get(currentVideo.src);

                if (cachedBlob) {
                    const blobUrl = URL.createObjectURL(cachedBlob);
                    videoRef.current.src = blobUrl;
                    videoRef.current.onended = () => URL.revokeObjectURL(blobUrl);
                } else {
                    // Fallback si le cache échoue
                    videoRef.current.src = currentVideo.src;
                }

                videoRef.current.load();
                await videoRef.current.play();
                // eslint-disable-next-line
            } catch (error: any) {
                console.error("Error playing video:", error);
            }
        };

        playCurrentVideo();

        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [videoIndex, hasUserInteracted, areVideosReady, currentVideo.src]);

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

            // eslint-disable-next-line
            const interactionToTrigger:any = currentVideo.interactions.find(
                (i) => Math.floor(i.timecode) === currentTime &&
                    !displayedTimecodes.includes(i.timecode)
            );

            if (interactionToTrigger) {
                setDisplayedTimecodes((prev) => [...prev, interactionToTrigger.timecode]);

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
                else if (interactionToTrigger.blocking) {
                    if (!interactionToTrigger.loop) {
                        video.pause();
                    }
                    setCurrentInteraction({
                        ...interactionToTrigger,
                        state: "blocking",
                    });
                }
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
                    .slice(0, videoIndex)// eslint-disable-next-line
                    .reduce((acc, v:any) => acc + v.duration, 0) + video.currentTime;

                const totalDuration = videos
                    .slice(0, videos.length - 1)// eslint-disable-next-line
                    .reduce((acc, v:any) => acc + v.duration, 0);

                setProgress(Math.min(playedDuration / totalDuration, 1));
            }
            animationFrame = requestAnimationFrame(updateProgress);
        };

        if (hasUserInteracted) {
            animationFrame = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [hasUserInteracted, videoIndex]);

    const handleInteractionComplete = () => {
        if (currentInteraction?.canGoNext) {
            handleEnded();
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

    const handleUserStart = async () => {
        setHasUserInteracted(true);
        startGlobalTimer();

        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
            await videoRef.current.play().catch(console.error);
        }

        if (audioRef.current) {
            audioRef.current.volume = 0.9;
            await audioRef.current.play().catch(console.error);
        }
    };

    const togglePlay = () => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video || currentInteraction?.blocking) return;
        if (video.paused) {
            video.play();
            if (audio) audio.play();
        } else {
            video.pause();
            if (audio) audio.pause();
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-50">
            {!hasUserInteracted ? (
                <div className="flex items-center justify-center h-full flex-col gap-4">
                    {!areVideosReady || loadingProgress < 100 ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-white text-lg">Chargement des vidéos...</div>
                            <div className="w-64 h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-300"
                                    style={{ width: `${loadingProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleUserStart}
                            className="bg-white text-black px-6 py-3 rounded text-xl hover:bg-gray-200 transition"
                        >
                            ▶️ Play
                        </button>
                    )}
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <video
                        ref={videoRef}
                        key={currentVideo.src}
                        controls={false}
                        autoPlay
                        playsInline
                        muted={false}
                        className="w-full h-full object-cover"
                        onEnded={handleEnded}
                    />

                    <AnimatePresence>
                        {currentInteraction && (
                            <motion.div
                                key={`interaction-${currentInteraction?.timecode}`}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`
                                    absolute inset-0 flex items-center justify-center z-50
                                    ${currentInteraction.blocking && currentInteraction.blockingBg ? "bg-black/50 pointer-events-auto" : ""}
                                `}
                            >
                                {currentInteraction.component?.({
                                    onComplete: handleInteractionComplete,
                                    disabled: currentInteraction?.blocking &&
                                        currentInteraction?.state === "preview",
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                                            <div className="flex space-x-8">
                                                <button
                                                    onClick={togglePlay}
                                                    className={`text-white ${
                                                        currentInteraction?.blocking
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : "hover:cursor-pointer"
                                                    } bg-[#DBE2EA]/40 h-[60px] w-[60px] rounded-full items-center justify-center flex transition`}
                                                    disabled={currentInteraction?.blocking}
                                                >
                                                    {videoRef.current?.paused ? (
                                                        <Play />
                                                    ) : (
                                                        <img alt="" width={20} height={27} src="/images/pause.png" />
                                                    )}
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    const video = videoRef.current;
                                                    if (video) {
                                                        video.muted = !video.muted;
                                                    }
                                                }}
                                                className="text-white hover:cursor-pointer bg-[#DBE2EA]/40 h-[60px] w-[60px] rounded-full items-center justify-center flex transition"
                                            >
                                                {videoRef.current?.muted ? (
                                                    <VolumeX />
                                                ) : (
                                                    <img src="/images/volume-on.png" alt="" width={32} height={32} />
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => alert("On closing app")}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 left-4 text-white bg-[#DBE2EA]/40 h-[55px] w-[55px] rounded-full items-center justify-center flex z-50"
                    >
                        <X />
                    </motion.button>

                    <AnimatePresence>
                        {!hoverControls && (
                            <motion.button
                                key="token"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.3 }}
                                className="fixed min-w-[150px] z-100 top-6 right-4 text-white bg-[#DBE2EA]/40 flex rounded-full items-center justify-center"
                            >
                                <img className="h-[54px] w-[54px]" src="/images/globe-kin-gem.png" alt="" />
                                <span className="w-full font-bold text-xl justify-center">
                                    {token}
                                </span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <audio
                ref={audioRef}
                src="/audios/ocean-loop.mp3"
                autoPlay={false}
                loop
                hidden
                preload="auto"
            />
        </div>
    );
}
