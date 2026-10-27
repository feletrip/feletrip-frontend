import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

const MyBlogHeader = () => {
  return (
    <Motion>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-9 md:gap-0 mb-9 border rounded-2xl p-9 border-ring/30 bg-primary/10">
        <Motion animationType="fadeLeft" delay={0.2}>
          <SectionHeader
            title="Vendor Blogs"
            description=" Manage your created travel blogs"
          ></SectionHeader>
        </Motion>
        <Motion animationType="fadeRight" delay={0.2}>
          <Button>
            <CirclePlus />
            <Link href={"/dashboard/host/blogs/add-blogs"}>Add New Blog</Link>
          </Button>
        </Motion>
      </div>
    </Motion>
  );
};

export default MyBlogHeader;
