// components/VideoElement.tsx
import React from "react";

type Props = {
    videoRef: React.RefObject<HTMLVideoElement|null>;
    currentVideoSrc: string;
    loop: boolean;
};

export default function VideoElement({ videoRef, currentVideoSrc, loop }: Props) {
    return (
        <video
            ref={videoRef}
            key={currentVideoSrc}
            controls={false}
            autoPlay
            loop={loop}
            playsInline
            muted={false}
            className="w-full h-full object-cover"
        />
    );
}
