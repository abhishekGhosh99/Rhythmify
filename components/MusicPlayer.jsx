"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePlay,
  setVolume,
  nextTrack,
  previousTrack,
  toggleShuffle,
  toggleRepeat,
} from "@/store/slices/playerSlice";
import { useEffect, useRef, useState, useCallback, memo } from "react";
import YouTube from "react-youtube";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  ListMusic,
  MonitorSpeaker,
  Maximize2,
  Heart,
} from "lucide-react";

const MusicPlayer = memo(() => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    volume,
    currentTrack,
    queue,
    isShuffled,
    repeatMode, // 'off', 'all', 'one'
  } = useSelector((state) => state.player);

  const playerRef = useRef(null);

  // UI state
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [isUserSeeking, setIsUserSeeking] = useState(false);

  // Refs for intervals
  const updateIntervalRef = useRef(null);
  const lastSecondRef = useRef(-1);

  if (!currentTrack) return null;

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  // Truncate title function
  const truncateText = (text, maxLength = 25) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Handle track end
  const handleTrackEnd = useCallback(() => {
    if (repeatMode === "one") {
      if (playerRef.current) {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
      }
    } else if (repeatMode === "all" || queue.length > 1) {
      dispatch(nextTrack());
    } else {
      dispatch(togglePlay());
    }
  }, [repeatMode, queue.length, dispatch]);

  // Memoized update function with clamped progress
  const updateProgress = useCallback(() => {
    if (!playerRef.current || isUserSeeking) return;

    try {
      const current = playerRef.current.getCurrentTime?.();
      const total = playerRef.current.getDuration?.();

      if (typeof current === "number" && !isNaN(current)) {
        const currentSecond = Math.floor(current);

        // Always update immediately when starting a new second
        if (currentSecond !== lastSecondRef.current) {
          lastSecondRef.current = currentSecond;
          setCurrentTime(currentSecond);
        }

        // Use actual duration (not floored) so we don’t cut off last second
        if (typeof total === "number" && !isNaN(total) && total > 0) {
          setProgress(Math.min((current / total) * 100, 100)); // clamp to 100%
          setDuration(Math.round(total)); // round for cleaner display

          // Auto next when reaching full duration
          if (current >= total) {
            handleTrackEnd();
          }
        }
      }
    } catch (error) {
      console.warn("Progress update failed:", error);
    }
  }, [isUserSeeking, handleTrackEnd]);

  const handleReady = useCallback(
    (event) => {
      playerRef.current = event.target;

      try {
        playerRef.current.setVolume(volume);
        const total = playerRef.current.getDuration();
        if (typeof total === "number" && !isNaN(total)) {
          setDuration(Math.floor(total));
        }
      } catch (err) {
        console.warn("Player setup failed:", err);
      }

      setPlayerReady(true);
      if (isPlaying) {
        event.target.playVideo();
      }
    },
    [volume, isPlaying]
  );

  // Play/Pause sync
  useEffect(() => {
    if (playerRef.current && playerReady) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, playerReady]);

  // Volume sync
  useEffect(() => {
    if (playerRef.current && playerReady) {
      try {
        playerRef.current.setVolume(volume);
      } catch (err) {
        console.warn("Volume update failed:", err);
      }
    }
  }, [volume, playerReady]);

  // Main timer effect
  useEffect(() => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }

    if (!isPlaying || !playerReady) return;

    updateProgress(); // immediate update

    updateIntervalRef.current = setInterval(() => {
      updateProgress();
    }, 1000); // consistent 1s tick

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
    };
  }, [isPlaying, playerReady, currentTrack?.id, updateProgress]);

  // Reset when track changes
  useEffect(() => {
    setCurrentTime(0);
    setProgress(0);
    lastSecondRef.current = -1;
  }, [currentTrack?.id]);

  const formatTime = useCallback((time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (queue.length > 1) {
      dispatch(nextTrack());
    }
  }, [dispatch, queue.length]);

  const handlePrevious = useCallback(() => {
    if (currentTime > 3) {
      if (playerRef.current) {
        playerRef.current.seekTo(0, true);
        setCurrentTime(0);
        setProgress(0);
        lastSecondRef.current = -1;
      }
    } else if (queue.length > 1) {
      dispatch(previousTrack());
    }
  }, [dispatch, currentTime, queue.length]);

  const handleShuffle = useCallback(() => {
    dispatch(toggleShuffle());
  }, [dispatch]);

  const handleRepeat = useCallback(() => {
    dispatch(toggleRepeat());
  }, [dispatch]);

  const handleSeekStart = useCallback(() => {
    setIsUserSeeking(true);
  }, []);

  const handleSeek = useCallback(
    (e) => {
      const newProgress = Number(e.target.value);
      setProgress(newProgress);

      if (duration > 0) {
        const newTime = (newProgress / 100) * duration;
        setCurrentTime(Math.floor(newTime));
        lastSecondRef.current = Math.floor(newTime);
      }
    },
    [duration]
  );

  const handleSeekEnd = useCallback(
    (e) => {
      const newProgress = Number(e.target.value);
      if (playerRef.current && duration > 0) {
        try {
          const seekTime = (newProgress / 100) * duration;
          playerRef.current.seekTo(seekTime, true);
          lastSecondRef.current = Math.floor(seekTime);
        } catch (error) {
          console.warn("Seek failed:", error);
        }
      }
      setTimeout(() => setIsUserSeeking(false), 100);
    },
    [duration]
  );

  const handlePlayPause = useCallback(() => {
    dispatch(togglePlay());
  }, [dispatch]);

  const handleVolumeChange = useCallback(
    (e) => {
      dispatch(setVolume(Number(e.target.value)));
    },
    [dispatch]
  );

  const handleMuteToggle = useCallback(() => {
    dispatch(setVolume(volume > 0 ? 0 : 50));
  }, [dispatch, volume]);

  return (
    <div className="w-full h-[90px] bg-neutral-950 border-t border-neutral-800 px-4 flex flex-col text-white">
      {/* Top Section */}
      <div className="flex items-center justify-between h-[90px]">
        {/* Left Section */}
        <div className="flex items-center gap-4 w-[25%] min-w-0">
          <img
            src={currentTrack.albumCover}
            alt="Album Cover"
            className="w-14 h-14 rounded-md object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-semibold truncate"
              title={currentTrack.title}
            >
              {truncateText(currentTrack.title, 30)}
            </p>
            <p
              className="text-xs text-neutral-400 truncate"
              title={currentTrack.artist}
            >
              {truncateText(currentTrack.artist, 25)}
            </p>
          </div>
          <Heart className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white flex-shrink-0" />
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center w-[50%]">
          <div className="flex items-center gap-6 mb-2">
            <button onClick={handleShuffle}>
              <Shuffle
                className={`w-5 h-5 cursor-pointer transition-colors ${
                  isShuffled
                    ? "text-green-500"
                    : "text-neutral-400 hover:text-white"
                }`}
              />
            </button>

            <button
              onClick={handlePrevious}
              disabled={queue.length <= 1 && currentTime <= 3}
              className="disabled:opacity-50"
            >
              <SkipBack className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black" />
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={queue.length <= 1 && repeatMode === "off"}
              className="disabled:opacity-50"
            >
              <SkipForward className="w-6 h-6 text-neutral-400 hover:text-white cursor-pointer" />
            </button>

            <button onClick={handleRepeat}>
              {repeatMode === "one" ? (
                <Repeat1 className="w-5 h-5 text-green-500 cursor-pointer transition-colors" />
              ) : (
                <Repeat
                  className={`w-5 h-5 cursor-pointer transition-colors ${
                    repeatMode === "all"
                      ? "text-green-500"
                      : "text-neutral-400 hover:text-white"
                  }`}
                />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span
              className="text-xs tabular-nums text-neutral-300"
              style={{ minWidth: "35px", textAlign: "right" }}
            >
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onMouseDown={handleSeekStart}
              onTouchStart={handleSeekStart}
              onChange={handleSeek}
              onMouseUp={handleSeekEnd}
              onTouchEnd={handleSeekEnd}
              className="w-full accent-white cursor-pointer"
            />
            <span
              className="text-xs text-neutral-400"
              style={{ minWidth: "35px" }}
            >
              {formatTime(duration)}
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
                onClick={handleMuteToggle}
              />
            ) : (
              <VolumeX
                className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer"
                onClick={handleMuteToggle}
              />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-white cursor-pointer"
            />
          </div>
          <Maximize2 className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Hidden YouTube Player */}
      <YouTube videoId={currentTrack.id} opts={opts} onReady={handleReady} />
    </div>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
