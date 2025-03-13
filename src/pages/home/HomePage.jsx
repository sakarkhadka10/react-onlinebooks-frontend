import React from "react";
import HomeCarousel from "../../components/ui/Carousel/HomeCarousel";
import LatestBooks from "../../components/homepage/LatestBooks";
import TrendingBooks from "../../components/homepage/TrendingBooks";
import Genres from "../../components/homepage/Genres";
import BannerAds from "../../components/homepage/BannerAds";
import TopSelling from "../../components/homepage/TopSelling";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <Genres />
      <TopSelling />
      <LatestBooks />
      <BannerAds />
      <TrendingBooks />
    </div>
  );
};

export default HomePage;
