import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  titleClassname?: string;
};

export default function ObeoRoomsLogo({
  className = "",
  titleClassname = "",
}: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 z-50 ${className}`}>
      <Image
        src="/logo.png"
        alt="ObeoRooms"
        width={50}
        height={50}
        priority
        sizes="50px"
        className="h-11 w-auto"
      />

      <h1 className={`text-3xl font-bold tracking-tight ${titleClassname}`}>
        <span className="text-primary">Obeo</span>
        <span>Rooms</span>
      </h1>
    </Link>
  );
}
