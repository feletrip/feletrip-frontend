// components/about/AboutImage.tsx

import Image from "next/image";

type AboutImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function AboutImage({
  src,
  alt,
  className = "",
}: AboutImageProps) {
  return (
    <div className={`relative h-40 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}