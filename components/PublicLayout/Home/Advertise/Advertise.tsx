import { Container } from "../../Shared/Container";
import Link from "next/link";
import Image from "next/image";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { getAdvertisements } from "@/Server/Home/Advertisements.action";

export default async function Advertise() {
  const response = await getAdvertisements();
  const ad = response?.data?.[0];

  const bannerImage = ad?.bannerImage;

  // if no advertisement
  if (!bannerImage) {
    return null;
  }

  return (
    <Motion animationType="scale">
      <Container className="mb-20">
        <Link href={bannerImage}>
          <Image
            src={bannerImage}
            alt={ad?.title || "Special Offer"}
            width={1200}
            height={200}
            sizes="90vw"
            className="w-full rounded-xl shadow-xl object-cover max-h-62.5 transition-transform duration-300 hover:scale-[1.01]"
            loading="eager"
            priority
          />
        </Link>
      </Container>
    </Motion>
  );
}
