import React from "react";
import banner1 from "../../assets/images/banner1.webp";
import { Link } from "react-router-dom";

const BannerSlideshow = () => {
  return (
    <div className="container mx-auto mb-16">
      <Link to="/product">
        <img src={banner1} alt="" />
      </Link>
    </div>
  );
};

export default BannerSlideshow;
