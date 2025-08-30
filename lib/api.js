export async function fetchMusicByCategory(category) {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category} music&type=video&maxResults=10&key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube music");
  }

  const data = await res.json();

  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}
