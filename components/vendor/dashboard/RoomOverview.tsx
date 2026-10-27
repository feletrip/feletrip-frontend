import { Motion } from "@/components/Reuseable/common/Framermotion";
import { getVendorRoomOverview } from "@/Server/Vendor/dashboard.action";
import {
  BedDouble,
  Layers,
  CheckCircle2,
  AlertCircle,
  Hotel,
} from "lucide-react";
import RateSlider from "./RateSlider";

const RoomOverview = async () => {
  const roomRes = await getVendorRoomOverview();
  const roomOverview = roomRes?.data;

  const totalTypes = roomOverview?.totalRoomTypes ?? 0;
  const activeTypes = roomOverview?.activeRoomTypes ?? 0;
  const inactiveTypes = roomOverview?.inactiveRoomTypes ?? 0;

  const availability =
    totalTypes > 0 ? Math.round((activeTypes / totalTypes) * 100) : 0;

  return (
    <Motion>
      <section className="relative overflow-hidden h-full rounded-2xl border border-border">
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        {/* Hero Section */}
        {/* Hero Section */}
        
          <div className="relative z-10 flex flex-col gap-5 2xl:flex-row 2xl:items-center 2xl:justify-between p-5 ">
            {/* Branding */}
            <Motion animationType="fadeLeft" delay={0.3}>
              <div className="flex items-start  gap-4">
                <div className="mt-3 text-primary shadow-xl shadow-primary/30">
                  <Hotel size={32} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">
                      Room Command Center
                    </h2>

                    
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Monitor room inventory, availability, and operational health
                    from one place.
                  </p>
                </div>
              </div>
            </Motion>

            {/* Main KPI */}
            <Motion animationType="fadeRight" delay={0.4}>
              <div className="relative overflow-hidden rounded-2xl border  border-primary/20 bg-primary/10 px-8  py-5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent" />

                <div className="relative flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Rooms
                    </p>
                  </div>

                  <div className="">
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-3xl font-black tracking-tight text-primary">
                        {roomOverview?.totalRooms ?? 0}
                      </span>

                      <div className="rounded-xl bg-primary/20 p-2">
                        <BedDouble size={20} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Motion>
          </div>

        {/* Statistics Area */}
        <div className="flex flex-col gap-5 px-5 pb-5">
          {/* Room Types */}
          <Motion animationType="slideDown" delay={0.3}>
            <div className="p-5 h-full bg-linear-to-br from-info/10 to-info/2  border border-border rounded-2xl ">
              <div className="flex items-center justify-between gap-2 ">
                <div className=" flex  h-10 w-10 items-center  justify-center rounded-xl text-info bg-info/10">
                  <Layers size={20} />
                </div>

                <span className=" rounded-full bg-info/10 px-3  py-1 text-xs text-info">
                  Categories
                </span>
              </div>

              <h3 className="text-2xl mt-2 font-semibold text-foreground">
                {totalTypes}
              </h3>

              <p className="mt-1 text-sm  text-muted-foreground">
                Total room types
              </p>
            </div>
          </Motion>

          {/* Active Rooms */}
          <Motion animationType="slideDown" delay={0.5}>
            <div className="p-5 h-full bg-linear-to-br from-success/10 to-success/2  border border-border rounded-2xl">
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10  items-center justify-center rounded-xl text-success bg-success/10">
                  <CheckCircle2 size={20} />
                </div>

                <span className=" text-xs text-success rounded-full bg-success/10  px-3  py-1">
                  Available
                </span>
              </div>

              <h3 className="text-2xl mt-2 font-semibold text-foreground">
                {activeTypes}
              </h3>

              <p className="mt-1  text-sm text-muted-foreground">
                Active room types
              </p>
            </div>
          </Motion>

          {/* Inactive */}
          <Motion animationType="slideDown" delay={0.7}>
            <div className="p-5 h-full bg-linear-to-br from-destructive/10 to-destructive/2 border border-border rounded-2xl">
              <div className="flex items-center  justify-between gap-2">
                <div className="flex h-10  w-10 items-center justify-center rounded-xl text-destructive bg-destructive/10">
                  <AlertCircle size={20} />
                </div>

                <span className=" text-xs text-destructive rounded-full bg-destructive/10 px-3 py-1">
                  Inactive
                </span>
              </div>

              <h3 className="text-2xl mt-2 font-semibold text-foreground">
                {inactiveTypes}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Inactive room types
              </p>
            </div>
          </Motion>
        </div>

        {/* Health Footer */}
        <Motion animationType="fadeRight" delay={0.4}>
          <div className="border-t border-border bg-background/50  p-6">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Inventory Availability
              </span>

              <span className="font-semibold text-primary">
                {availability}%
              </span>
            </div>
            <RateSlider rate={availability}></RateSlider>
          </div>
        </Motion>
      </section>
    </Motion>
  );
};

export default RoomOverview;
