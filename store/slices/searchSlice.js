import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMusicByCategory } from "@/lib/api";

// Async thunk for searching
export const searchSongs = createAsyncThunk(
  "search/searchSongs",
  async (query) => {
    if (!query) return [];
    const songs = await fetchMusicByCategory(query); // already normalized
    return songs;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
