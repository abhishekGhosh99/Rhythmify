export async function fetchMusicByCategory(category) {
  const clientId = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;

  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&tags=${category}&limit=10`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch music");
  }

  const data = await res.json();
  return data.results;
}
