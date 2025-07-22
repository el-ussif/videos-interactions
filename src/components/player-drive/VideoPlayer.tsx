"use client";

import {useEffect, useRef, useState} from "react";
import {videos as VideosData} from "@/data/videos";
import {AnimatePresence, motion} from "framer-motion";
import {useInteractionTimerStore} from "@/store/interaction-timer-store";
import {useParams} from "next/navigation";
import VideoLoadingScreen from "@/components/player-drive/video-loading-screen";
import VideoElement from "@/components/player-drive/video-element";
import VideoControls from "@/components/player-drive/video-controls";
import VideoTopBar from "@/components/player-drive/video-top-bar";

export default function VideoPlayer() {
    const { id } = useParams();
    const currentIndex = VideosData.findIndex((item) => item.slug === id);
    const videoData = currentIndex !== -1 ? VideosData[currentIndex] : null;
    const videos = videoData?.items ?? [];
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [videoIndex, setVideoIndex] = useState(0);
    //eslint-disable-next-line
    const [currentInteraction, setCurrentInteraction] = useState<null | any>(null);
    const [displayedTimecodes, setDisplayedTimecodes] = useState<number[]>([]);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hoverControls, setHoverControls] = useState(false);
    const [areVideosReady, setAreVideosReady] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [videoDurations, setVideoDurations] = useState<number[]>([]);
    const videoCache = useRef<Map<string, { blob: Blob; duration: number }>>(new Map());
    const interactionTimeRef = useRef<number>(0);
    const interactionStartRef = useRef<number>(0);
    const interactionFrameRef = useRef<number | null>(null);

    const currentVideo = videos[videoIndex];
    const { startGlobalTimer } = useInteractionTimerStore.getState();

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
        if (!areVideosReady || !hasUserInteracted || !currentVideo?.src) return;

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
                await audioRef.current?.play();
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
    }, [videoIndex, hasUserInteracted, areVideosReady, currentVideo?.src]);

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
        const audio = audioRef.current;
        if (!audio) return;

        let newVolume: number | undefined;

        if (currentInteraction?.volume) {
            newVolume = currentInteraction.volume;
        } else if (currentVideo?.volume) {
            newVolume = Number(currentVideo?.volume??0.7);
        }

        if (newVolume !== undefined) {
            audio.volume = Math.max(0, Math.min(1, newVolume)); // clamp between 0 and 1
        } else {
            audio.volume = 0.1; // volume par défaut si rien de défini
        }
    }, [videoIndex, currentInteraction]);

    useEffect(() => {
        if (
            currentInteraction?.state === 'preview' &&
            currentInteraction?.previewDuration > 0 &&
            videoRef?.current?.currentTime &&
            Math.abs(videoRef.current.currentTime - currentInteraction.previewDuration) < 0.2
        ) {
            videoRef.current.pause();
            //eslint-disable-next-line
            setCurrentInteraction((prev: any) => ({
                ...prev,
                state: "blocking"
            }));
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

    if (!hasUserInteracted) {
        return (
            <VideoLoadingScreen loadingProgress={loadingProgress}/>
        )
    }

    if (currentIndex === -1) {
        return (
            <div className="p-4 text-red-400 text-xl font-semibold text-center">
                No videos found for the ID <strong>{id}</strong>.
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return (
            <div className="p-4 text-red-400 text-xl font-semibold text-center">
                This video does not contain any available content.
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50">
            <div className="w-full h-full relative">
                <VideoElement
                 currentVideoSrc={currentVideo?.src}
                 loop={currentInteraction?.loop??false}
                 videoRef={videoRef}
                 key={currentVideo?.src}
                />

                <AnimatePresence>
                    {currentInteraction && (
                        <motion.div
                            key={`interaction-${currentInteraction?.timecode}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`absolute inset-0 flex items-center justify-center z-50 ${currentInteraction.blocking && currentInteraction.blockingBg ? "bg-black/50 pointer-events-auto" : ""}`}
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
                        <VideoControls
                            blocking={currentInteraction?.blocking}
                            hoverControls={hoverControls}
                            isMuted={!!videoRef.current?.muted}
                            isPaused={!!videoRef.current?.paused}
                            onMuteToggle={() => {
                                const video = videoRef.current;
                                const audio = audioRef.current;
                                if (video) video.muted = !video.muted;
                                if (audio) audio.muted = !audio.muted;
                            }}
                            onPlayPause={togglePlay}
                            progress={progress}
                        />
                    </div>
                </div>

                <VideoTopBar
                    showToken={!hoverControls}
                />
            </div>

            <audio
                ref={audioRef}
                src={videoData?.defaultAudio??"/audios/ocean-loops.mp3"}
                autoPlay={false}
                loop
                hidden
                preload="auto"
            />
        </div>
    );
}
