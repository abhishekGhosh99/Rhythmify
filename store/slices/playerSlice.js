import { createSlice } from "@reduxjs/toolkit";

// Utility function for shuffling array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initialState = {
  isPlaying: false,
  progress: 0,
  volume: 70,
  currentTrack: {
    title: "Song Title",
    artist: "Artist Name",
    albumCover: "https://www.shyamh.com/images/blog/music.jpg",
  },
  queue: [], // Array of tracks
  originalQueue: [], // Original order before shuffle
  currentIndex: 0,
  isShuffled: false,
  repeatMode: "off", // 'off', 'all', 'one'
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },

    setVolume: (state, action) => {
      state.volume = action.payload;
    },

    setTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.isPlaying = true; // auto play when track changes
    },

    setQueue: (state, action) => {
      // Ensure all tracks have proper default values
      const sanitizedQueue = action.payload.map((track) => ({
        id: track.id || `track-${Date.now()}-${Math.random()}`,
        title: track.title || track.name || "Unknown Song",
        albumCover:
          track.albumCover ||
          track.album_image ||
          "https://www.shyamh.com/images/blog/music.jpg",
        artist: track.artist || track.artist_name || "Unknown Artist",
        duration: track.duration || "0:00",
        album_name: track.album_name || "Unknown Album",
      }));

      state.queue = sanitizedQueue;
      state.originalQueue = sanitizedQueue;
      state.currentIndex = 0;

      // Only set currentTrack if queue has items
      if (sanitizedQueue.length > 0) {
        state.currentTrack = sanitizedQueue[0];
      }
    },

    nextTrack: (state) => {
      if (state.queue.length === 0) return;

      if (state.isShuffled) {
        // Random next track (excluding current)
        const availableIndices = state.queue
          .map((_, index) => index)
          .filter((index) => index !== state.currentIndex);

        if (availableIndices.length > 0) {
          const randomIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
          state.currentIndex = randomIndex;
          state.currentTrack = state.queue[randomIndex];
        }
      } else {
        // Sequential next
        if (state.currentIndex < state.queue.length - 1) {
          state.currentIndex += 1;
        } else if (state.repeatMode === "all") {
          state.currentIndex = 0; // Loop back to first
        } else {
          return; // Stay on last track
        }
        state.currentTrack = state.queue[state.currentIndex];
      }
      state.isPlaying = true; // auto play next track
    },

    previousTrack: (state) => {
      if (state.queue.length === 0) return;

      if (state.isShuffled) {
        // Random previous track (excluding current)
        const availableIndices = state.queue
          .map((_, index) => index)
          .filter((index) => index !== state.currentIndex);

        if (availableIndices.length > 0) {
          const randomIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
          state.currentIndex = randomIndex;
          state.currentTrack = state.queue[randomIndex];
        }
      } else {
        // Sequential previous
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
        } else if (state.repeatMode === "all") {
          state.currentIndex = state.queue.length - 1; // Loop to last
        } else {
          return; // Stay on first track
        }
        state.currentTrack = state.queue[state.currentIndex];
      }
      state.isPlaying = true; // auto play previous track
    },

    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;

      if (state.isShuffled) {
        // Save current track
        const currentTrack = state.currentTrack;

        // Shuffle the queue
        state.queue = shuffleArray(state.originalQueue);

        // Find new index of current track
        state.currentIndex = state.queue.findIndex(
          (track) => track.id === currentTrack?.id
        );
        if (state.currentIndex === -1) state.currentIndex = 0;
      } else {
        // Restore original order
        state.queue = [...state.originalQueue];

        // Find index in original order
        if (state.currentTrack) {
          state.currentIndex = state.originalQueue.findIndex(
            (track) => track.id === state.currentTrack.id
          );
          if (state.currentIndex === -1) state.currentIndex = 0;
        }
      }
    },

    toggleRepeat: (state) => {
      // Cycle through: off -> all -> one -> off
      switch (state.repeatMode) {
        case "off":
          state.repeatMode = "all";
          break;
        case "all":
          state.repeatMode = "one";
          break;
        case "one":
          state.repeatMode = "off";
          break;
        default:
          state.repeatMode = "off";
      }
    },

    playTrackAtIndex: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.queue.length) {
        state.currentIndex = index;
        state.currentTrack = state.queue[index];
        state.isPlaying = true;
      }
    },
  },
});

export const {
  togglePlay,
  setProgress,
  setVolume,
  setTrack,
  setQueue,
  nextTrack,
  previousTrack,
  toggleShuffle,
  toggleRepeat,
  playTrackAtIndex,
} = playerSlice.actions;

export default playerSlice.reducer;
