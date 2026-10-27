import PhotosGallery from "./components/PhotosGallery";
import { getVendorHotel } from "@/Server/Vendor/vendorHotel.action";

const PhotosGalleryPage = async () => {
  const response = await getVendorHotel();

  const hotels =
    response?.success && Array.isArray(response.data) ? response.data : [];

  return <PhotosGallery hotels={hotels} pagination={response.pagination} />;
};

export default PhotosGalleryPage;
