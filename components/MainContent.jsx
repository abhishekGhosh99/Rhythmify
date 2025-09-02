"use client";
import { useState, useEffect } from "react";
import { fetchMusicByCategory } from "@/lib/api";
import TrackCard from "@/components/TrackCard";
import { useDispatch } from "react-redux";
import { setTrack } from "@/store/slices/playerSlice";

// Simple category filter component
function CategoryFilter({ selectedCategory, onSelect }) {
  const categories = ["All", "Music", "Podcasts", "Hollywood"];

  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === cat
              ? "bg-blue-500 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default function MainContent() {
  const [tracks, setTracks] = useState([]);
  const [category, setCategory] = useState("Bollywood");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMusicByCategory(category).then(setTracks).catch(console.error);
  }, [category]);

  const handleSelect = (track) => {
    dispatch(
      setTrack({
        id: track.id,
        title: track.title,
        albumCover: track.thumbnail,
        artist: "Unknown Artist", // YouTube doesn’t give artist, can parse from title
      })
    );
  };

  return (
    <div className="p-6">
      {/* Category Filter */}
      <CategoryFilter selectedCategory={category} onSelect={setCategory} />

      {/* Grid of Track Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-zinc-300">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
