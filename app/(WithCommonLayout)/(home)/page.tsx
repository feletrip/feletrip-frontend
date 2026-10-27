import Advertise from "@/components/PublicLayout/Home/Advertise/Advertise";
import Banner from "@/components/PublicLayout/Home/Banner/Banner";
import BlogSection from "@/components/PublicLayout/Home/BlogSection/BlogSection";
import PopularCategories from "@/components/PublicLayout/Home/CategoryCard/PopularCetagories";
import ContactSection from "@/components/PublicLayout/Home/ContactSection/ContactSection";
import ReviewsSection from "@/components/PublicLayout/Home/Reviews/ReviewsSection";
import SpecialOffer from "@/components/PublicLayout/Home/SpecialOffer/SpecialOffer";
import TopDestinations from "@/components/PublicLayout/Home/TopDestinations/TopDestinations";
import TrendingHotels from "@/components/PublicLayout/Home/TrendingHotels/TrendingHotels";
import VideoSection from "@/components/PublicLayout/Home/VideoSection/VideoSection";
import RedirectToast from "@/components/Reuseable/common/RedirectToast";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      {/* Proxy Redirect Toast */}
      <Suspense fallback={null}>
        <RedirectToast />
      </Suspense>

      {/* main content */}
      <Banner></Banner>
      <SpecialOffer></SpecialOffer>
      <Advertise></Advertise>
      <TopDestinations></TopDestinations>
      <TrendingHotels></TrendingHotels>
      <VideoSection></VideoSection>
      <PopularCategories></PopularCategories>
      <ReviewsSection></ReviewsSection>
      <ContactSection></ContactSection>
      <BlogSection></BlogSection>
    </>
  );
}
