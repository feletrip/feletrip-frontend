"use client";
import React, { useState } from "react";
import SectionTitle from "../Typography";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsAccordionProps {
  faqs: FAQ[];
}

const FAQs: React.FC<FAQsAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto my-16">
      <SectionTitle
        title="FAQs"
        className="my-16"
        divClassName="justify-center"
      />
      <div className="bg-muted p-6 rounded-xl shadow-md divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left focus:outline-none"
            >
              <span className="font-semibold text-lg text-brand-primary">
                {faq.question}
              </span>
              <span className="ml-4 text-gray-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
