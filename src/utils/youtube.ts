// Extract the YouTube video ID from any common URL shape
// (watch?v=, youtu.be/, /embed/, /shorts/, with or without extra query params).
export function getYouTubeVideoId(url: string): string {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split("/")[0];
    }
    const vParam = parsed.searchParams.get("v");
    if (vParam) return vParam;
    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
    }
    if (parsed.pathname.includes("/shorts/")) {
      return parsed.pathname.split("/shorts/")[1]?.split("/")[0] ?? "";
    }
    return "";
  } catch {
    // Fallback for non-standard/relative strings that fail URL parsing.
    const match = url.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([\w-]+)/);
    return match?.[1] ?? "";
  }
}
