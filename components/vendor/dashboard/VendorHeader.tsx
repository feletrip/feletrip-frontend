import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";

const VendorHeader = () => {
    return (
        <Motion>
            <div className="mb-9 flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-xl p-9 border-ring/30 bg-primary/10">
                <SectionHeader title="Vendor Dashboard" description="Welcome to your dashboard and manage your properties" />
            </div>
        </Motion>
    )
}

export default VendorHeader;