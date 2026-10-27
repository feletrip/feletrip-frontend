import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { Button } from "@/components/ui/button";
import { Rss } from "lucide-react";
import Link from "next/link";

const CreateBlogHeader = () => {
  return (
    <Motion>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-9 md:gap-0 mb-9 border rounded-2xl p-9 border-ring/30 bg-primary/10">
        <SectionHeader
          title="Create New Blog"
          description="Publish your latest stories and updates."
        />
        <Button>
          <Rss />
          <Link href={"/dashboard/host/blogs/my-blogs"}>See Blogs</Link>
        </Button>
      </div>
    </Motion>
  );
};

export default CreateBlogHeader;
