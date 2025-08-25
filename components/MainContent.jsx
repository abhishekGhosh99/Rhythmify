"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMusicByCategory } from "@/lib/api";
import TrackCard from "./TrackCard";

export default function MainContent() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function loadMusic() {
      try {
        const pop = await fetchMusicByCategory("pop");
        const rock = await fetchMusicByCategory("rock");

        setSections([
          {
            title: "Pop Hits",
            items: pop.map((track) => ({
              id: track.id,
              title: track.name,
              desc: track.artist_name,
              img: track.album_image || "/covers/default.jpg",
              audio: track.audio,
            })),
          },
          {
            title: "Rock Hits",
            items: rock.map((track) => ({
              id: track.id,
              title: track.name,
              desc: track.artist_name,
              img: track.album_image || "/covers/default.jpg",
              audio: track.audio,
            })),
          },
        ]);
      } catch (err) {
        console.error("Error loading music:", err);
      }
    }
    loadMusic();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 rounded-lg mx-0 bg-zinc-800">
      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <Button variant="secondary" className="rounded-full px-4 py-1">
          All
        </Button>
        <Button
          variant="ghost"
          className="rounded-full px-4 py-1 text-white border-[1px] border-white"
        >
          Music
        </Button>
        <Button
          variant="ghost"
          className="rounded-full px-4 py-1 text-white border-[1px] border-white"
        >
          Podcasts
        </Button>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.title} className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            <button className="flex items-center text-sm text-neutral-400 hover:text-white">
              Show all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {section.items.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
