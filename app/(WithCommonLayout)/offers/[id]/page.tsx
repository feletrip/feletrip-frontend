import FAQs from "@/components/PublicLayout/OfferPage/FAQs";
import HowToAvail from "@/components/PublicLayout/OfferPage/HowToAvail";
import OfferInfoCard from "@/components/PublicLayout/OfferPage/OfferInfoCard";
import TermsConditions from "@/components/PublicLayout/OfferPage/TermsConditions";
import SectionTitle from "@/components/PublicLayout/Typography";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CiBullhorn, CiCalendar } from "react-icons/ci";
import { FaHandshake } from "react-icons/fa";

interface Offer {
  id: number;
  title: string;
  description: string;
  promoCode: string;
  image: string;
  highlight?: boolean;
  partner?: string;
  validity?: string;
  howToAvail?: [];
  termsAndConditions?: [];
  faqs?: [];
}

interface OfferPageProps {
  params: Promise<{
    id: string;
  }>;
}

const SingleOfferPage = async ({ params }: OfferPageProps) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/offers`, {
    cache: "no-store",
  });
  const offers: Offer[] = await res.json();
  const offer = offers.find((o) => o.id.toString() === id);
  if (!offer) {
    return notFound();
  }
  return (
    <div className="">
      <div className="relative w-full h-screen">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-fill"
        />
      </div>
      {/* Section Title */}
      <SectionTitle
        title="What is the Offer"
        className="my-20 w-11/12 mx-auto text-center"
        divClassName="justify-center"
      />
      {/* Offers */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <OfferInfoCard
          icon={<CiBullhorn size={60} className="text-brand-primary" />}
          title="Offer"
          content={
            <>
              <h3 className="text-lg">{offer.title}</h3>
              <h3>{offer.description}</h3>
            </>
          }
        />
        <OfferInfoCard
          icon={<FaHandshake size={60} className="text-brand-primary" />}
          title="Partner"
          content={<p className="text-lg">{offer.partner}</p>}
        />
        <OfferInfoCard
          icon={<CiCalendar size={60} className="text-brand-primary" />}
          title="Validity"
          content={<p className="text-lg">{offer.validity}</p>}
        />
      </div>
      <HowToAvail steps={offer.howToAvail || []} />
      <TermsConditions terms={offer.termsAndConditions || []} />
      <FAQs faqs={offer.faqs || []} />
    </div>
  );
};

export default SingleOfferPage;
