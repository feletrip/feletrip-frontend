import React from "react";
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaPinterestP } from "react-icons/fa6";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/example-blog",
    icon: <FaFacebookF size={13} />,
    color: "#1877F2",
  },
  {
    label: "X",
    href: "https://twitter.com/example-blog",
    icon: <FaXTwitter size={13} />,
    color: "#000000",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/example-blog",
    icon: <FaInstagram size={13} />,
    color: "#E1306C",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/example-channel",
    icon: <FaYoutube size={13} />,
    color: "#FF0000",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/example-blog",
    icon: <FaPinterestP size={13} />,
    color: "#E60023",
  },
];

export default function SocialIcons() {
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map(({ label, href, icon, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow on ${label}`}
          className="group relative flex items-center justify-center w-9 h-9 border border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 overflow-hidden transition-colors duration-300"
          style={
            {
              "--brand": color,
            } as React.CSSProperties
          }
        >
          {/* Fill layer */}
          <span
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
            style={{ backgroundColor: color }}
          />
          {/* Icon */}
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            {icon}
          </span>
        </a>
      ))}
    </div>
  );
}