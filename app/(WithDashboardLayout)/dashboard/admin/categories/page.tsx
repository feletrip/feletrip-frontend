import AddCategories from "@/components/admin/category/AddCategories";
import CategoryDataTable from "@/components/admin/category/CategoryDataTable";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import { getCategories } from "@/Server/Admin/category.admin.action";
import { CategoryItem } from "@/types/admin/category";
import { Hotel,HelpCircle } from "lucide-react";



const CategoriesPage = async () => {
    const initialCategories = await getCategories();
    const categories: CategoryItem[] = initialCategories?.data as unknown as CategoryItem[] || [];

    return (
        <div className="min-h-screen bg-background text-foreground p-6 sm:p-8 space-y-8">
            <Motion>
                <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-xl p-9 border-ring/30 bg-primary/10">
                    <SectionHeader
                        title="Hotel Categories Management"
                        description="Manage and categorize hotels into distinct groups for easier organization and search."
                        highlight="HotelAdmin"
                    />
                    <AddCategories />
                </div>
            </Motion>
            {/* category state card  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Added a grid layout so cards don't stack full-width */}
                {/* total categories card  */}
                <StatsCard
                    title="Total Categories"
                    value={categories.length}
                    animationIndex={0}
                    icon={HelpCircle}
                    bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
                    iconStyle="bg-amber-500 text-amber-500-foreground"
                />
                {/* total hotels card  */}
                <StatsCard
                    title="Total Hotels"
                    value={categories.reduce((acc, category) => acc + category._count.hotels, 0)}
                    animationIndex={2}
                    icon={Hotel}
                    bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
                    iconStyle="bg-blue-500 text-blue-500-foreground"
                />
            </div>
            <div>
                <CategoryDataTable categories={categories} />
            </div>
        </div>
    );
};

export default CategoriesPage;