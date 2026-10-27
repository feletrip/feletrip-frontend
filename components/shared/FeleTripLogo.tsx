import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  titleClassname?: string;
};

export default function FeleTripLogo({
  className = "",
  titleClassname = "",
}: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 z-50 ${className}`}>
      <Image
        src="/logo.png"
        alt="FeleTrip"
        width={50}
        height={50}
        priority
        sizes="50px"
        className="h-11 w-auto"
      />

      <h1 className={`text-3xl font-bold tracking-tight ${titleClassname}`}>
        <span className="text-primary">Fele</span>
        <span>Trip</span>
      </h1>
    </Link>
  );
}
