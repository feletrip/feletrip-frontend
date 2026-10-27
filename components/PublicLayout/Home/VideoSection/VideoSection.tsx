import { getVideos } from "@/Server/Home/publicVideos.action";
import VideoPlayerModal from "./VideoPlayerModal";

export default async function VideoSection() {
  const response = await getVideos();
  const video = response?.data?.data?.[0];

  const bgUrl =
    "https://html.kodesolution.com/2025/hoteler-html/images/background/video-bg.jpg";

  if (!video || !video.url) {
    return null;
  }

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center bg-center bg-cover bg-fixed"
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <VideoPlayerModal
          youtubeUrl={video.url}
        />
      </div>
    </section>
  );
}
