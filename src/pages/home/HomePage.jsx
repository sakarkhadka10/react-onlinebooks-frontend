import React from "react";
import HomeCarousel from "../../components/ui/Carousel/HomeCarousel";
import LatestBooks from "../../components/homepage/LatestBooks";
import TrendingBooks from "../../components/homepage/TrendingBooks";
import Genres from "../../components/homepage/Genres";
import BannerAds from "../../components/homepage/BannerAds";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <Genres />
      <LatestBooks />
      <BannerAds />
      <TrendingBooks />
    </div>
  );
};

export default HomePage;
