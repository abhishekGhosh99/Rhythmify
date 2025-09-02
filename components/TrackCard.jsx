"use client";

export default function TrackCard({ track, onSelect }) {
  // Reuse the same truncate helper as in MusicPlayer
  const truncateText = (text, maxLength = 25) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="cursor-pointer rounded-lg shadow-md hover:shadow-lg transition"
      onClick={() => onSelect(track)}
    >
      <img
        src={track.thumbnail}
        alt={track.title}
        className="rounded-lg w-full h-40 object-cover"
      />
      <p
        className="mt-2 text-sm font-semibold text-center truncate px-2"
        title={track.title} // tooltip with full title
      >
        {truncateText(track.title, 30)}
      </p>

      {track.artist && (
        <p
          className="text-xs text-neutral-400 text-center truncate px-2"
          title={track.artist}
        >
          {truncateText(track.artist, 25)}
        </p>
      )}
    </div>
  );
}
