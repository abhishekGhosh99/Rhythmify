"use client";
import { Plus, ArrowRight, Search, SquareLibrary } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const playlists = [
    { name: "Liked Songs", type: "Playlist • 109 songs", icon: "💜" },
    {
      name: "Bengali Playlist",
      type: "Playlist • Ag",
      img: "https://www.shyamh.com/images/blog/music.jpg",
    },
    {
      name: "DHH",
      type: "Playlist • Ag",
      img: "https://www.shyamh.com/images/blog/music.jpg",
    },
    {
      name: "Mitraz",
      type: "Artist",
      img: "https://www.shyamh.com/images/blog/music.jpg",
    },
    {
      name: "Mitraz",
      type: "Artist",
      img: "https://www.shyamh.com/images/blog/music.jpg",
    },
    {
      name: "Calm Anime Playlist",
      type: "Playlist • Arbiter Ayuna 21",
      img: "https://www.shyamh.com/images/blog/music.jpg",
    },
  ];

  return (
    <div className="w-70 h-[calc(100vh-166px)] bg-zinc-800 text-white flex flex-col rounded-lg mx-2 fixed top-[70px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-semibold flex gap-2">
          <SquareLibrary />
          Your Library
        </h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full p-2">
            <Plus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full p-2">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 px-4">
        <Button className="rounded-full bg-zinc-900 text-white px-4 py-1 text-sm">
          Playlists
        </Button>
        <Button className="rounded-full bg-zinc-900 text-white px-4 py-1 text-sm">
          Podcasts & Shows
        </Button>
      </div>

      {/* Search + Sort */}
      <div className="flex items-center justify-between px-5 py-3">
        <Search className="w-5 h-5 text-neutral-400" />
        <span className="text-sm text-neutral-400 cursor-pointer">
          Recents ▾
        </span>
      </div>

      {/* Playlist List */}
      <div className="flex-1 overflow-y-auto">
        {playlists.map((pl, i) => (
          <Card
            key={i}
            className="py-2 bg-transparent rounded-none flex flex-col gap-2 hover:bg-neutral-900 cursor-pointer border-none"
          >
            <CardContent className="flex items-center gap-3 rounded-lg text-white px-4">
              {pl.img ? (
                <img
                  src={pl.img}
                  alt={pl.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-600 to-blue-600">
                  <span className="text-xl">{pl.icon}</span>
                </div>
              )}
              <div>
                <p className="font-medium">{pl.name}</p>
                <p className="text-xs text-neutral-400">{pl.type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
