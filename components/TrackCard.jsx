"use client";

import { useDispatch } from "react-redux";
import { setTrack } from "@/store/slices/playerSlice";

const TrackCard = ({ track }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setTrack({
        title: track.title,
        artist: track.desc, // ✅ use desc instead of artist_name
        albumCover: track.img, // ✅ use img instead of image
        audio: track.audio,
      })
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-neutral-900 p-3 rounded-xl cursor-pointer hover:bg-neutral-800 transition"
    >
      <img
        src={track.img} // ✅ fixed
        alt={track.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <p className="text-sm font-semibold truncate text-white">{track.title}</p>
      <p className="text-xs text-neutral-400 truncate">{track.desc}</p>
    </div>
  );
};

export default TrackCard;
