import HomeCarousel from "../../components/ui/Carousel/HomeCarousel";
import LatestBooks from "../../components/homepage/LatestBooks";
import TrendingBooks from "../../components/homepage/FeatureBooks";
import Genres from "../../components/homepage/Genres";
import BannerAds from "../../components/homepage/BannerAds";
import TopSelling from "../../components/homepage/TopSelling";
import ProductCategorySection from "../../components/homepage/ProductCategorySection";
import MainAds from "../../components/homepage/MainAds";

const HomePage = () => {
  return (
    <>
      <div>
        <HomeCarousel />
        <div className="hidden lg:block">
          <ProductCategorySection />
          <MainAds />
        </div>
        <TopSelling />
        <Genres />

        <LatestBooks />
        <BannerAds />
        <TrendingBooks />
      </div>
    </>
  );
};

export default HomePage;
