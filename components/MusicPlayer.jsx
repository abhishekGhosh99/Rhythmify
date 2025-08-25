"use client";

import { useDispatch, useSelector } from "react-redux";
import { togglePlay, setProgress, setVolume } from "@/store/slices/playerSlice";
import { useEffect, useRef } from "react";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  ListMusic,
  MonitorSpeaker,
  Maximize2,
  Heart,
} from "lucide-react";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { isPlaying, progress, volume, currentTrack } = useSelector(
    (state) => state.player
  );

  const audioRef = useRef(null);

  // 🔹 When track changes or play/pause toggles
  useEffect(() => {
    if (!audioRef.current || !currentTrack?.audio) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // 🔹 Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // 🔹 Sync progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        const percent = (audio.currentTime / audio.duration) * 100;
        dispatch(setProgress(percent));
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [dispatch]);

  if (!currentTrack) return null;

  return (
    <div className="w-full h-[90px] bg-neutral-950 border-t border-neutral-800 px-4 flex items-center justify-between text-white">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack.audio} preload="metadata" />

      {/* Left Section */}
      <div className="flex items-center gap-4 w-[25%]">
        <img
          src={currentTrack.albumCover}
          alt="Album Cover"
          className="w-14 h-14 rounded-md object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{currentTrack.title}</p>
          <p className="text-xs text-neutral-400">{currentTrack.artist}</p>
        </div>
        <Heart className="ml-2 w-5 h-5 text-neutral-400 cursor-pointer hover:text-white" />
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center w-[50%]">
        <div className="flex items-center gap-6 mb-2">
          <Shuffle className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
          <SkipBack className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer" />

          <button
            onClick={() => dispatch(togglePlay())}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black" />
            ) : (
              <Play className="w-6 h-6 text-black" />
            )}
          </button>

          <SkipForward className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer" />
          <Repeat className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-neutral-400">
            {audioRef.current
              ? Math.floor(audioRef.current.currentTime / 60) +
                ":" +
                ("0" + Math.floor(audioRef.current.currentTime % 60)).slice(-2)
              : "0:00"}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => dispatch(setProgress(Number(e.target.value)))}
            className="w-full accent-white cursor-pointer"
          />
          <span className="text-xs text-neutral-400">
            {audioRef.current && !isNaN(audioRef.current.duration)
              ? Math.floor(audioRef.current.duration / 60) +
                ":" +
                ("0" + Math.floor(audioRef.current.duration % 60)).slice(-2)
              : "0:00"}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 w-[25%] justify-end">
        <ListMusic className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
        <MonitorSpeaker className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 w-28">
          {volume > 0 ? (
            <Volume2
              className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer"
              onClick={() => dispatch(setVolume(0))}
            />
          ) : (
            <VolumeX
              className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer"
              onClick={() => dispatch(setVolume(50))}
            />
          )}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => dispatch(setVolume(Number(e.target.value)))}
            className="w-full accent-white cursor-pointer"
          />
        </div>
        <Maximize2 className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
}
