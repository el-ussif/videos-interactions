"use client";

import { useEffect, useRef, useState } from "react";
import { videos } from "@/data/videos";
import {Pause, Play, Volume2, VolumeX, X} from "lucide-react";

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoIndex, setVideoIndex] = useState(0);
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentInteraction, setCurrentInteraction] = useState<null | any>(null);
    const [displayedTimecodes, setDisplayedTimecodes] = useState<number[]>([]);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
    const [progress, setProgress] = useState(0);


    const currentVideo = videos[videoIndex];

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // Reset interaction state when switching video
    useEffect(() => {
        setCurrentInteraction(null);
        setDisplayedTimecodes([]);
        if (interactionTimeout) clearTimeout(interactionTimeout);
    }, [videoIndex]);

    // Main interval to trigger interactions
    useEffect(() => {
        const interval = setInterval(() => {
            const video = videoRef.current;
            if (!video || currentInteraction) return;

            const currentTime = Math.floor(video.currentTime);

            const interactionToTrigger = currentVideo.interactions.find(
                (i) =>
                    Math.floor(i.timecode) === currentTime &&
                    !displayedTimecodes.includes(i.timecode)
            );

            if (interactionToTrigger) {
                setDisplayedTimecodes((prev) => [...prev, interactionToTrigger.timecode]);

                if (interactionToTrigger.blocking) {
                    video.pause();
                    setCurrentInteraction(interactionToTrigger);
                } else {
                    setCurrentInteraction(interactionToTrigger);

                    const timeout = setTimeout(() => {
                        setCurrentInteraction(null);
                    }, (5) * 1000);

                    setInteractionTimeout(timeout);
                }
            }
        }, 300);

        return () => clearInterval(interval);
    }, [currentVideo, currentInteraction, displayedTimecodes]);

    const handleInteractionComplete = () => {
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
            if (video) {
                video.muted = false;
                video.volume = 1; // Assure le volume maximum
                video.play().catch((err) => {
                    console.error("Erreur de lecture :", err);
                });
            }
        }, 100);
    };

    useEffect(() => {
        let animationFrame: number;

        const updateProgress = () => {
            const video = videoRef.current;
            if (video && video.duration) {
                setProgress(video.currentTime / video.duration);
            }
            animationFrame = requestAnimationFrame(updateProgress);
        };

        if (hasUserInteracted) {
            animationFrame = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [hasUserInteracted]);

    return (
        <>
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
                    <>
                        <video
                            ref={videoRef}
                            src={currentVideo.src}
                            controls={false}
                            autoPlay
                            playsInline
                            muted={false} // démarre en muted pour éviter les erreurs navigateur
                            className="w-full h-full object-cover"
                            onEnded={handleEnded}
                        />

                        {currentInteraction && (
                            <div
                                className={`absolute inset-0 flex items-center justify-center z-50 transition-opacity ${
                                    currentInteraction.blocking
                                        ? "bg-black/70 pointer-events-auto"
                                        : "pointer-events-none"
                                }`}
                            >
                                {currentInteraction.component({
                                    onComplete: handleInteractionComplete,
                                })}
                            </div>
                        )}
                    </>
                )}

                {
                    hasUserInteracted && (

                        <div
                            className="absolute flex flex-wrap bottom-0 w-full bg-black/60 text-white items-center z-50">
                            <div
                                className="w-full h-2 bg-gray-700 rounded cursor-pointer mb-3 relative"
                                onClick={(e) => {
                                    const video = videoRef.current;
                                    if (!video) return;

                                    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                                    const clickX = e.clientX - rect.left;
                                    const percentage = clickX / rect.width;
                                    video.currentTime = video.duration * percentage;
                                    //setProgress(percentage);
                                }}
                            >
                                <div
                                    className="h-full bg-white/60 rounded"
                                    style={{width: `${progress * 100}%`}}
                                />
                            </div>

                            <div className="w-full flex justify-between px-6 pt-2 pb-4 flex items-center">
                                <div className="flex space-x-8">
                                    <button
                                        onClick={() => {
                                            const video = videoRef.current;
                                            if (!video) return;

                                            if (video.paused) {
                                                video.play();
                                            } else {
                                                video.pause();
                                            }
                                        }}
                                        className="text-white hover:cursor-pointer bg-[#DBE2EA]/40 h-[64px] w-[64px] rounded-full items-center justify-center flex transition"
                                    >
                                        {
                                            videoRef.current?.paused ? (<Play/>) : (<Pause/>)
                                        }
                                    </button>

                                    <button
                                        className="text-white bg-[#DBE2EA]/40 pr-5 flex space-x-2 rounded-full items-center justify-center flex transition"
                                    >
                                        <img className="w-[64px]" src="/images/globe-kin-gem.png" alt=""/>
                                        <span>
                                            <strong> 500 </strong>
                                            Tokens
                                        </span>
                                    </button>
                                </div>

                                <div className="">
                                    <button

                                        onClick={() => {
                                            const video = videoRef.current;
                                            if (!video) return;

                                            video.muted = !video.muted;
                                        }}
                                        className="text-white hover:cursor-pointer bg-[#DBE2EA]/40 h-[64px] w-[64px] rounded-full items-center justify-center flex transition"
                                    >
                                        {
                                            videoRef.current?.muted ? (<VolumeX/>) : (<Volume2/>)
                                        }
                                    </button>

                                </div>

                            </div>
                        </div>
                    )
                }

                {
                    hasUserInteracted && (
                        <button
                            onClick={() => {
                                alert("On closing app")
                            }}
                            className="fixed top-4 left-4 text-white hover:cursor-pointer bg-[#DBE2EA]/40 h-[55px] hover:scale-110 w-[55px] rounded-full items-center justify-center flex transition"
                        >
                            <X/>
                        </button>
                    )
                }
            </div>
        </>
    );
}
