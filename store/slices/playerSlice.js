import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  progress: 0,
  volume: 70,
  currentTrack: {
    title: "Song Title",
    artist: "Artist Name",
    albumCover: "/album.jpg",
  },
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
  },
});

export const { togglePlay, setProgress, setVolume, setTrack } =
  playerSlice.actions;
export default playerSlice.reducer;
