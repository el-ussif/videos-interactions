"use client";

import { useEffect, useRef, useState } from "react";
import { videos } from "@/data/videos";
import { Play, VolumeX, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useTokenStore from "@/store/token-store";
import { useInteractionTimerStore } from "@/store/interaction-timer-store";

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoIndex, setVideoIndex] = useState(0);
    // eslint-disable-next-line
    const [currentInteraction, setCurrentInteraction] = useState<null | any>(null);
    const [displayedTimecodes, setDisplayedTimecodes] = useState<number[]>([]);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hoverControls, setHoverControls] = useState(false);
    const [areVideosReady, setAreVideosReady] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [videoDurations, setVideoDurations] = useState<number[]>([]);
    const audioRef = useRef<HTMLAudioElement>(null);
    const currentVideo = videos[videoIndex];
    const { token } = useTokenStore();
    const { startGlobalTimer } = useInteractionTimerStore.getState();
    const videoCache = useRef<Map<string, { blob: Blob; duration: number }>>(new Map());
    const interactionTimeRef = useRef<number>(0);
    const interactionStartRef = useRef<number>(0);
    const interactionFrameRef = useRef<number | null>(null);

    // Calculate total duration from actual video durations
    const totalDuration = videoDurations.reduce((acc, duration) => acc + duration, 0);

    useEffect(() => {
        const preloadVideos = async () => {
            const total = videos.length;
            let count = 0;
            const durations: number[] = [];

            for (const video of videos) {
                try {
                    if (!videoCache.current.has(video.src)) {
                        // Fetch video blob
                        const res = await fetch(video.src);
                        const blob = await res.blob();

                        // Get duration by creating a temporary video element
                        const tempVideo = document.createElement('video');
                        tempVideo.src = URL.createObjectURL(blob);

                        const duration = await new Promise<number>((resolve) => {
                            tempVideo.onloadedmetadata = () => {
                                resolve(tempVideo.duration);
                                URL.revokeObjectURL(tempVideo.src);
                            };
                            tempVideo.onerror = () => {
                                URL.revokeObjectURL(tempVideo.src);
                            };
                        });

                        durations.push(duration);
                        videoCache.current.set(video.src, { blob, duration });
                    } else {
                        durations.push(videoCache.current.get(video.src)!.duration);
                    }

                    count++;
                    setLoadingProgress(Math.round((count / total) * 100));
                } catch (e) {
                    console.error("Preload error", e);
                    durations.push(0); // Fallback
                    count++;
                    setLoadingProgress(Math.round((count / total) * 100));
                }
            }

            setVideoDurations(durations);
            setAreVideosReady(true);
        };

        preloadVideos();
        return () => videoCache.current.clear();
    }, []);

    useEffect(() => {
        if (areVideosReady) {
            const handleUserInteraction = async () => {
                try {
                    const starterButton = document.getElementById("starter");

                    if (starterButton) {
                        // Déclenche un vrai clic sur le bouton
                        starterButton.click();
                    } else {
                        console.warn("Bouton starter introuvable, appel direct de handleUserStart");
                        handleUserStart();
                    }
                } catch (e) {
                    console.error("Échec de la simulation de clic :", e);
                    handleUserStart(); // fallback
                }
            };

            // Optionnel : attendre un délai avant de lancer
            const delay = 100;
            const timer = setTimeout(handleUserInteraction, delay);

            return () => clearTimeout(timer);
        }
    }, [areVideosReady]);


    useEffect(() => {
        if (!areVideosReady || !hasUserInteracted) return;

        const playVideo = async () => {
            const cached = videoCache.current.get(currentVideo.src);
            if (cached) {
                const blobUrl = URL.createObjectURL(cached.blob);
                videoRef.current!.src = blobUrl;
                videoRef.current!.onended = () => {
                    URL.revokeObjectURL(blobUrl);
                    handleEnded();
                };
            } else {
                videoRef.current!.src = currentVideo.src;
            }

            videoRef.current!.load();
            try {
                await videoRef.current!.play();
            } catch (e) {
                console.warn("Autoplay failed", e);
            }
        };

        playVideo();

        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute("src");
                videoRef.current.load();
            }
        };
    }, [videoIndex, hasUserInteracted, areVideosReady, currentVideo.src]);

    useEffect(() => {
        const interval = setInterval(() => {
            const video = videoRef.current;
            if (!video || !currentVideo?.interactions) return;

            const currentTime = video.currentTime;

            // Trouve la prochaine interaction déclenchable
            // eslint-disable-next-line
            const toTrigger: any = currentVideo.interactions.find(
                // eslint-disable-next-line
                (i: any) =>
                    i.timecode <= (currentTime) &&
                    !displayedTimecodes.includes(i.timecode)
            );

            if (!toTrigger) {
                return;
            }

            setDisplayedTimecodes((prev) => [...prev, toTrigger.timecode]);

            if (toTrigger.blocking && toTrigger.previewDuration) {
                setCurrentInteraction({ ...toTrigger, state: "preview" });
            } else if (toTrigger.blocking) {
                if (!toTrigger.loop) {
                    video.pause();
                }
                setCurrentInteraction({ ...toTrigger, state: "blocking" });
            } else {
                interactionTimeRef.current = 0;
                interactionStartRef.current = performance.now();
                setCurrentInteraction({ ...toTrigger, state: "preview" });
                startInteractionTimer(toTrigger.duration || 5);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [currentVideo, displayedTimecodes, videoRef?.current]);

    useEffect(() => {
        if (currentInteraction?.state === 'preview' && currentInteraction?.previewDuration > 0 && Number(videoRef?.current?.currentTime??0).toFixed(3) === Number(currentInteraction?.previewDuration??0).toFixed(3) && videoRef?.current) {
            videoRef?.current?.pause()
            // eslint-disable-next-line
            setCurrentInteraction((prev: any) => {
                return {
                    ...prev,
                    state: "blocking"
                }
            })
        }
    }, [videoRef?.current?.currentTime]);


    const startInteractionTimer = (duration: number) => {
        const step = (now: number) => {
            const video = videoRef.current;
            if (!video || video.paused) {
                interactionStartRef.current = now - interactionTimeRef.current;
            } else {
                interactionTimeRef.current = now - interactionStartRef.current;
                if (interactionTimeRef.current >= duration * 1000) {
                    setCurrentInteraction(null);
                    return;
                }
            }
            interactionFrameRef.current = requestAnimationFrame(step);
        };
        interactionFrameRef.current = requestAnimationFrame(step);
    };

    useEffect(() => {
        return () => {
            if (interactionFrameRef.current) {
                cancelAnimationFrame(interactionFrameRef.current);
            }
        };
    }, []);


    useEffect(() => {
        let frame: number;
        let lastUpdateTime = 0;
        const updateInterval = 100;

        const updateProgress = (timestamp: number) => {
            const video = videoRef.current;
            if (!video || !hasUserInteracted || videoDurations.length === 0) return;

            if (timestamp - lastUpdateTime >= updateInterval || lastUpdateTime === 0) {
                const previousVideosTime = videoDurations
                    .slice(0, videoIndex)
                    .reduce((acc, duration) => acc + duration, 0);

                const currentVideoTime = video.currentTime;
                const elapsedTime = previousVideosTime + currentVideoTime;
                const newProgress = totalDuration > 0 ? Math.min(elapsedTime / totalDuration, 1) : 0;

                if (newProgress !== progress) {
                    setProgress(newProgress);
                }

                lastUpdateTime = timestamp;
            }

            frame = requestAnimationFrame(updateProgress);
        };

        if (hasUserInteracted && totalDuration > 0) {
            frame = requestAnimationFrame(updateProgress);
        }

        return () => {
            if (frame) cancelAnimationFrame(frame);
        };
    }, [videoIndex, hasUserInteracted, progress, videoDurations, totalDuration]);

    const handleUserStart = async () => {
        setHasUserInteracted(true);
        startGlobalTimer();
        try {
            if (videoRef.current) {
                videoRef.current.muted = false;
                await videoRef.current.play();
            }
            if (audioRef.current) {
                audioRef.current.volume = 0.9;
                await audioRef.current.play();
            }
        } catch (e) {
            console.error("VIDEO PLAY FAILED", e);
        }
    };

    const togglePlay = () => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video || currentInteraction?.blocking) return;
        if (video.paused) {
            video.play();
            audio?.play();
        } else {
            video.pause();
            audio?.pause();
        }
    };

    const handleEnded = () => {
        if (videoIndex < videos.length - 1) {
            setVideoIndex(videoIndex + 1);
            setDisplayedTimecodes([])
        }
    };

    const handleInteractionComplete = () => {
        if (currentInteraction?.canGoNext) {
            setCurrentInteraction(null);
            handleEnded();
        } else {
            setCurrentInteraction(null);
            videoRef.current?.play();
        }
    };


    return (
        <div className="fixed inset-0 bg-black z-50">
            {!hasUserInteracted && (
                <div className="flex items-center justify-center h-full flex-col gap-4">
                    <div className="text-white text-lg">Chargement...</div>
                    <div className="w-64 h-2 bg-gray-700 rounded-full">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-300"
                            style={{ width: `${loadingProgress}%` }}
                        />
                    </div>
                    <button
                        id="starter"
                        disabled={loadingProgress<100}
                        onClick={handleUserStart}
                        className="mt-4 text-white px-4 py-2 bg-blue-600 rounded-full"
                    >
                        Start
                    </button>
                </div>
            )}

            <div className="w-full h-full relative">
                <video
                    ref={videoRef}
                    key={currentVideo.src}
                    controls={false}
                    autoPlay
                    loop={currentInteraction?.loop??false}
                    playsInline
                    muted={false}
                    className="w-full h-full object-cover"
                />

                <AnimatePresence>
                    {currentInteraction && (
                        <motion.div
                            key={`interaction-${currentInteraction?.timecode}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`absolute inset--0 top-[15%] inset-x-0 flex items-center justify-center z-50 ${currentInteraction.blocking && currentInteraction.blockingBg ? "bg-black/50 pointer-events-auto" : ""}`}
                        >
                            {currentInteraction.component?.({
                                onComplete: handleInteractionComplete,
                                disabled: currentInteraction?.blocking && currentInteraction?.state === "preview",
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-0 w-full h-24 z-50">
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
                                        <button
                                            onClick={togglePlay}
                                            className={`text-white ${currentInteraction?.blocking ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"} bg-[#DBE2EA]/40 h-[60px] w-[60px] rounded-full items-center justify-center flex transition`}
                                        >
                                            {videoRef.current?.paused ? (
                                                <Play fontWeight="bold" size={32} />
                                            ) : (
                                                <img alt="" width={20} height={27} src="/images/pause.png" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => {
                                                const video = videoRef.current;
                                                const audio = audioRef.current;
                                                if (video) video.muted = !video.muted;
                                                if (audio) audio.muted = !audio.muted;
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
