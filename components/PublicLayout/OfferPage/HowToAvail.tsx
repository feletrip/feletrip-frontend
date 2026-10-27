// components/HowToAvailTimeline.tsx
import React from "react";
import SectionTitle from "../Typography";

interface Step {
  step: number;
  title: string;
  details: [];
}

interface HowToAvailTimelineProps {
  steps: Step[];
}

const HowToAvailTimeline: React.FC<HowToAvailTimelineProps> = ({ steps }) => {
  return (
    <div className="w-11/12 mx-auto my-16">
      <SectionTitle
        title="How to Avail the Offer"
        className="my-20"
        divClassName="justify-center"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex flex-col bg-muted p-6 rounded-xl shadow-md"
          >
            {/* Number badge */}
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-background font-bold text-xl">
                {s.step}
              </span>
              {/* Step title */}
              <span className="text-xl font-semibold text-brand-primary mb-2">
                {s.title}
              </span>
            </div>

            {/* Step details as list */}
            <ul className="text-gray-700 space-y-2 text-left">
              {s.details.map((d, i) => (
                <li key={i} className="list-disc list-inside">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToAvailTimeline;
