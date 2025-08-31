import BannerDiscount from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import CardCarousel from "@/components/carrusel";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";


export default function Home() {
  return (
    <main>
      <CardCarousel />
      <FeaturedProducts />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProduct />
      
    </main>
  );
}
