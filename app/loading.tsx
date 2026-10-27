import Loader from "@/components/ui/loader";

export default function loading() {
  return (
    <div className="fixed inset-0 z-9999 h-screen w-screen bg-background">
      <Loader />
    </div>
  );
}
