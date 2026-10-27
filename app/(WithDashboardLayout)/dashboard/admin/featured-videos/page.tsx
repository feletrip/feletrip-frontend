import VideosClient from "@/components/modules/dashboard/admin/VideosClient";
import { getAllAdminVideos } from "@/Server/Admin/adminVideo.action";

export default async function HomepageVideosPage() {
  const res = await getAllAdminVideos();

  const initialVideos = res?.success && res?.data?.data ? res.data.data : [];
  const initialMeta = res?.data?.meta || { page: 1, limit: 10, total: 0 };

  return (
    <main className="w-full min-h-screen bg-background">
      <VideosClient
        initialVideosData={initialVideos}
        initialMeta={initialMeta}
      />
    </main>
  );
}
