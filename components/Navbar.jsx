"use client";
import { Input } from "@/components/ui/input";
import { Bell, Users, Home, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, searchSongs } from "@/store/slices/searchSlice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { query, results, loading } = useSelector((state) => state.search);

  // handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));

    if (value.length > 2) {
      dispatch(searchSongs(value)); // call API
    }
  };

  return (
    <nav className="w-full bg-black flex items-center justify-between py-2 px-4 relative">
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
          <div className="relative flex border-2 border-black rounded-lg">
            <Input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="What do you want to play?"
              className="bg-neutral-900 text-white border-none pl-10 w-90 rounded-full"
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400 w-4 h-4" />
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

      {/* Search Results Dropdown */}
      {query && results.length > 0 && (
        <div className="absolute top-16 left-1/3 w-[400px] bg-neutral-900 text-white rounded-lg shadow-lg p-3 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            results.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 p-2 hover:bg-neutral-800 rounded-md cursor-pointer"
              >
                <img
                  src={track.album_image || "/album.jpg"}
                  alt={track.name}
                  className="w-10 h-10 rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{track.name}</p>
                  <p className="text-xs text-gray-400">{track.artist_name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
