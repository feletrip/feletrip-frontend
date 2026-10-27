// components/TermsConditions.tsx
import React from "react";
import SectionTitle from "../Typography";

interface TermsConditionsProps {
  terms: string[];
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ terms }) => {
  return (
    <div className="w-11/12 mx-auto my-16">
      <SectionTitle
        title="  Terms & Conditions"
        className="my-16"
        divClassName="justify-center"
      />
      <div className="bg-muted p-8 rounded-xl shadow-md">
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          {terms.map((term, index) => (
            <li key={index} className="leading-relaxed">
              {term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TermsConditions;
