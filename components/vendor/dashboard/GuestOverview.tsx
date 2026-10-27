import { getVendorGuestOverview } from "@/Server/Vendor/dashboard.action";
import {
  UsersRound,
  UserPlus,
  UserRoundCheck,
  ArrowUpRight,
} from "lucide-react";
import RateSlider from "./RateSlider";
import { Motion } from "@/components/Reuseable/common/Framermotion";

const GuestOverview = async () => {
  const guestRes = await getVendorGuestOverview();
  const guestOverview = guestRes?.data;

  const totalGuests = guestOverview?.totalGuests ?? 0;
  const newGuests = guestOverview?.newGuests ?? 0;
  const returningGuests = guestOverview?.returningGuests ?? 0;

  const returningRate =
    totalGuests > 0 ? Math.round((returningGuests / totalGuests) * 100) : 0;

  return (
    <Motion className="">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 h-full">
        {/* Background Decoration */}
        <div className="absolute -right-24 -top-24 h-64  w-64  rounded-full bg-primary/10" />

        <div className="relative h-full">
          {/* Header */}
          <Motion animationType="fadeUp" delay={0.2}>
            <div className="flex items-center  justify-between">
              <div className="flex items-center gap-3">
                <div className="text-primary shadow-xl shadow-primary/30">
                  <UsersRound size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Guest Intelligence
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Understand your guest relationship
                  </p>
                </div>
              </div>
            </div>
          </Motion>

          {/* Main Content */}
          <Motion animationType="fadeUp" delay={0.3}>
            <div className="mt-8 flex flex-col  gap-5 ">
              {/* Total Guest Section */}
              <div className="rounded-2xl border border-border bg-background py-3 px-2">
                <p className="text-sm text-primary">
                  Total Guests Served
                </p>

                <div className="mt-4 flex items-end  gap-3">
                  <h1 className=" text-4xl font-black tracking-tight text-foreground ">
                    {totalGuests}
                  </h1>

                  <ArrowUpRight size={28} className="mb-3 text-success" />
                </div>

                <p className=" mt-3 text-xs text-muted-foreground">
                  Unique guests who interacted with your property
                </p>

                {/* Returning Rate */}
                <div className="mt-8">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Returning Guest Rate
                    </span>

                    <span className="font-semibold text-primary">
                      {returningRate}%
                    </span>
                  </div>

                  {/* guest rate slider */}
                  <RateSlider rate={returningRate}></RateSlider>

                  <p className="mt-2 text-xs  text-muted-foreground">
                    Guest loyalty indicator
                  </p>
                </div>
              </div>

              {/* Guest Segments */}
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                {/* New Guests */}
                <Motion
                  animationType="fadeRight"
                  delay={0.4}
                  className="w-full"
                >
                  <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-linear-to-br from-info/5 to-info/2 p-5">
                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10 text-info">
                        <UserPlus size={22} />
                      </div>
                      <span className="rounded-full bg-info/10 px-3 py-1 text-xs text-info">
                        First
                      </span>
                    </div>
                    <div className="flex flex-col items-start mt-5 w-full ">
                      <p className="text-sm text-muted-foreground">
                        New Guests
                      </p>

                      <h3 className="text-2xl font-bold text-foreground">
                        {newGuests}
                      </h3>
                    </div>
                  </div>
                </Motion>

                {/* Returning Guests */}
                <Motion
                  animationType="fadeRight"
                  delay={0.6}
                  className="w-full "
                >
                  <div className="flex flex-col items-center justify-between rounded-2xl border border-border bg-linear-to-br from-success/5 to-success/2 p-5">
                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl  bg-success/10 text-success">
                        <UserRoundCheck size={22} />
                      </div>
                      <span className="rounded-full bg-success/10 px-3 py-1 text-xs text-success">
                        Loyal
                      </span>
                    </div>
                    <div className="flex flex-col items-start mt-5 w-full">
                      <p className="text-sm text-muted-foreground">
                        Returning Guests
                      </p>

                      <h3 className="text-2xl font-bold text-foreground">
                        {returningGuests}
                      </h3>
                    </div>
                  </div>
                </Motion>
              </div>
            </div>
          </Motion>
        </div>
      </section>
    </Motion>
  );
};

export default GuestOverview;
