"use client";

import { useEffect } from "react";
import Image from "next/image";

interface Member {
  name: string;
  role: string;
  image: string;
  details: string;
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export default function TeamModal({ isOpen, onClose, member }: TeamModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800 transition-all duration-300 transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary hover:bg-primary/10 transition-all duration-300"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side: Image */}
          <div className="relative w-full md:w-1/2 h-80 md:h-auto aspect-4/5 overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-primary" />
          </div>

          {/* Right Side: Info */}
          <div className="flex flex-col w-full md:w-1/2 p-10 md:p-14 justify-center bg-white dark:bg-neutral-900">
            <div className="w-12 h-0.75 bg-primary mb-5 rounded-full" />

            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
              Team Member
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-50 tracking-tight leading-snug">
              {member.name}
            </h2>

            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 font-medium tracking-wide">
              {member.role}
            </p>

            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

            {/* Details Text */}
            <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed max-h-56 overflow-y-auto pr-3 font-normal">
              {member.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
