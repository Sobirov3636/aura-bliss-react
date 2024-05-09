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
      <NewArrivals />
      <Advertisement />
      <ProductCategories />
      <Events />
    </div>
  );
}

export default HomePage;
