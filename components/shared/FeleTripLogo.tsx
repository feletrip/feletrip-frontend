import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  titleClassname?: string;
  variant?: "auto" | "light" | "dark";
};

export default function FeleTripLogo({
  className = "",
  variant = "auto",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center z-50 transition-opacity hover:opacity-90 ${className}`}
    >
      {variant === "dark" ? (
        <Image
          src="/logo-white.png"
          alt="FeleTrip"
          width={180}
          height={48}
          priority
          className="h-10 sm:h-11 w-auto object-contain"
        />
      ) : variant === "light" ? (
        <Image
          src="/logo.png"
          alt="FeleTrip"
          width={180}
          height={48}
          priority
          className="h-10 sm:h-11 w-auto object-contain"
        />
      ) : (
        <>
          <Image
            src="/logo.png"
            alt="FeleTrip"
            width={180}
            height={48}
            priority
            className="h-10 sm:h-11 w-auto object-contain dark:hidden"
          />
          <Image
            src="/logo-white.png"
            alt="FeleTrip"
            width={180}
            height={48}
            priority
            className="h-10 sm:h-11 w-auto object-contain hidden dark:block"
          />
        </>
      )}
      <span className="sr-only">FeleTrip</span>
    </Link>
  );
}
