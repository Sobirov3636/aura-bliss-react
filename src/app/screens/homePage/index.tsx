import React, { useEffect } from "react";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Advertisement from "./Advertisement";
import ProductCategories from "./ProductCategories";
import Events from "./Events";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { retrieveBestSellers } from "./selector";
import { Product } from "../../../lib/types/product";
import { setBestSellers } from "./store";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setBestSellers: (data: Product[]) => dispatch(setBestSellers(data)),
});
const bestSellersRetriever = createSelector(retrieveBestSellers, (bestSellers) => ({ bestSellers }));

function HomePage() {
  const { setBestSellers } = actionDispatch(useDispatch());
  const { bestSellers } = useSelector(bestSellersRetriever);

  useEffect(() => {}, []);
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
