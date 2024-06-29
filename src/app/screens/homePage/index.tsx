import React, { useEffect } from "react";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Advertisement from "./Advertisement";
import ProductCategories from "./ProductCategories";
import Events from "./Events";

function HomePage() {
  // Selector: Store => Data
  useEffect(() => {
    // Backend server data request => Data
    // slice: Data => Store
  }, []);
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
