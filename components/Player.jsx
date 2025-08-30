import YouTube from "react-youtube";

export default function Player({ videoId }) {
  if (!videoId) return null;

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex items-center justify-between">
      <p className="text-sm">▶ Now Playing</p>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}
