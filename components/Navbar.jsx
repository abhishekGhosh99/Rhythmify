"use client";
import { Input } from "@/components/ui/input";
import { Bell, Users, Home, Search, Download, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  searchSongs,
  clearResults,
} from "@/store/slices/searchSlice";
import {
  setTrack,
  setQueue,
  playTrackAtIndex,
} from "@/store/slices/playerSlice";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { query, results, loading } = useSelector((state) => state.search);
  const { queue } = useSelector((state) => state.player);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));

    if (value.length > 2) {
      dispatch(searchSongs(value));
    } else if (value.length === 0) {
      dispatch(clearResults());
    }
  };

  const handleSelectTrack = (track, index) => {
    console.log("Track clicked:", track);

    if (!track) {
      console.error("Track is null or undefined");
      return;
    }

    // Get the best available image URL
    const getImageUrl = (track) => {
      // Check multiple possible image properties
      const possibleImages = [
        track.album_image,
        track.albumCover,
        track.thumbnail,
        track.snippet?.thumbnails?.medium?.url,
        track.snippet?.thumbnails?.high?.url,
        track.snippet?.thumbnails?.default?.url,
      ];

      // Find the first valid image URL
      for (const img of possibleImages) {
        if (img && typeof img === "string" && img.length > 0) {
          return img;
        }
      }

      // If no image found and we have a video ID, use YouTube thumbnail
      if (track.id) {
        return `https://img.youtube.com/vi/${track.id}/mqdefault.jpg`;
      }

      // Final fallback
      return "https://www.shyamh.com/images/blog/music.jpg";
    };

    const imageUrl = getImageUrl(track);
    console.log("Selected image URL:", imageUrl);

    const formattedTrack = {
      id: track.id || `track-${Date.now()}`,
      title: track.name || track.title || "Unknown Song",
      artist: track.artist_name || track.artist || "Unknown Artist",
      albumCover: imageUrl,
      duration: track.duration || "0:00",
    };

    console.log("Formatted track:", formattedTrack);

    try {
      dispatch(setTrack(formattedTrack));
      dispatch(clearResults());
    } catch (error) {
      console.error("Error dispatching track:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        dispatch(clearResults());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  // Clear search with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(clearResults());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const handleClearSearch = () => {
    dispatch(clearResults());
  };

  return (
    <nav className="w-full bg-black flex items-center justify-between py-2 px-4 relative z-50">
      {/* Left Section */}
      <div className="flex items-center gap-14">
        <div className="flex justify-center items-center">
          <Image
            src="/white_logo_transparent1.svg"
            alt="Rhythmify Logo"
            width={150}
            height={150}
          />
        </div>
        <div className="flex justify-center items-center gap-5 relative">
          <Link href="/" className="p-2 rounded-full bg-neutral-800">
            <Home className="text-white w-6 h-6" />
          </Link>

          {/* Enhanced Search Container */}
          <div className="relative" ref={searchRef}>
            <div className="relative flex border-2 border-black rounded-lg">
              <Input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="What do you want to play?"
                className="bg-neutral-900 text-white border-none pl-10 pr-10 w-96 rounded-full"
                autoComplete="off"
              />
              <Search className="absolute left-3 top-2.5 text-neutral-400 w-4 h-4" />

              {/* Clear button */}
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Enhanced Search Results Dropdown */}
            {query && (results.length > 0 || loading) && (
              <div
                ref={dropdownRef}
                className="absolute top-12 left-0 w-full bg-neutral-900 text-white rounded-lg shadow-2xl border border-neutral-700 max-h-96 overflow-y-auto z-50"
              >
                {loading ? (
                  <div className="p-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <p className="text-sm text-gray-400 mt-2">Searching...</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 border-b border-neutral-700">
                      <p className="text-xs text-neutral-400 uppercase tracking-wide">
                        Search Results for "{query}"
                      </p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {results.map((track, index) => {
                        // Debug image data
                        console.log(`Track ${index} image data:`, {
                          album_image: track.album_image,
                          albumCover: track.albumCover,
                          thumbnail: track.thumbnail,
                          // Check all possible image properties
                          allProperties: Object.keys(track).filter(
                            (key) =>
                              key.toLowerCase().includes("image") ||
                              key.toLowerCase().includes("thumb") ||
                              key.toLowerCase().includes("cover")
                          ),
                        });

                        return (
                          <div
                            key={track.id || index}
                            onClick={() => handleSelectTrack(track, index)}
                            className="flex items-center gap-3 p-3 hover:bg-neutral-800 cursor-pointer transition-colors border-b border-neutral-800 last:border-b-0 group"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <img
                                src={
                                  track.album_image ||
                                  track.albumCover ||
                                  track.thumbnail ||
                                  track.snippet?.thumbnails?.medium?.url ||
                                  track.snippet?.thumbnails?.default?.url ||
                                  `https://img.youtube.com/vi/${track.id}/mqdefault.jpg` || // YouTube thumbnail
                                  "https://www.shyamh.com/images/blog/music.jpg"
                                }
                                alt={track.name || track.title || "Song"}
                                className="w-12 h-12 rounded-md object-cover"
                                onError={(e) => {
                                  console.log(
                                    `Image failed for track ${track.name}:`,
                                    e.target.src
                                  );
                                  // Try YouTube thumbnail as backup
                                  if (
                                    !e.target.src.includes("img.youtube.com") &&
                                    track.id
                                  ) {
                                    e.target.src = `https://img.youtube.com/vi/${track.id}/mqdefault.jpg`;
                                  } else {
                                    e.target.src =
                                      "https://www.shyamh.com/images/blog/music.jpg";
                                  }
                                }}
                                onLoad={(e) => {
                                  console.log(
                                    `Image loaded successfully for ${track.name}:`,
                                    e.target.src
                                  );
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm font-medium truncate text-white"
                                title={track.name || track.title}
                              >
                                {track.name || track.title || "Unknown Song"}
                              </p>
                              <p
                                className="text-xs text-gray-400 truncate"
                                title={track.artist_name || track.artist}
                              >
                                {track.artist_name ||
                                  track.artist ||
                                  "Unknown Artist"}
                              </p>
                              {(track.album_name || track.album) && (
                                <p className="text-xs text-gray-500 truncate">
                                  {track.album_name || track.album}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {track.duration && (
                                <span className="text-xs text-neutral-400">
                                  {track.duration}
                                </span>
                              )}
                              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="w-4 h-4 text-white ml-0.5" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {results.length === 0 && !loading && (
                      <div className="p-4 text-center">
                        <p className="text-sm text-gray-400">
                          No results found
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <Button className="rounded-full bg-white text-black px-4 py-1 font-semibold hover:bg-neutral-200">
          Explore Premium
        </Button>
        <div className="flex items-center gap-4 text-neutral-300">
          <Download className="w-5 h-5" />
          <span className="text-sm">Install App</span>
          <Bell className="w-5 h-5" />
          <Users className="w-5 h-5" />
        </div>
        <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
