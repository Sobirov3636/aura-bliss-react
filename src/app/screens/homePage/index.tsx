import React from "react";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Advertisement from "./Advertisement";
import ProductCategories from "./ProductCategories";
import Events from "./Events";

function HomePage() {
  return (
    <div className='homepage'>
      <BestSellers />
      <ProductCategories />
      <Advertisement />
      <NewArrivals />
      <Events />
    </div>
  );
}

export default HomePage;
