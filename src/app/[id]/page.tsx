"use client"
import VideoPlayer from "@/components/player-drive/video-player";
import {useEffect} from "react";
import {useInteractionTimerStore} from "@/store/interaction-timer-store";

export default function Home() {
    const {  reset } = useInteractionTimerStore.getState();

    useEffect(() => {
        return () => {
           reset();
        }
    }, []);
  return (
      <div className="">
          <main className="min-h-screen flex items-center justify-center">
              <VideoPlayer/>
          </main>
      </div>
  );
}
