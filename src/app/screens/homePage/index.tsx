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
import { setBestSellers, setNewArrivals } from "./store";
import { ProductCategory } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setBestSellers: (data: Product[]) => dispatch(setBestSellers(data)),
  setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

function HomePage(props: HomePageProps) {
  const { onAdd } = props;
  const { setBestSellers, setNewArrivals } = actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server data fetch => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCategory: ProductCategory.PARFUME,
      })
      .then((data: any) => {
        setBestSellers(data);
      })
      .catch((err: any) => console.log(err));

    // New Arrivals
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setNewArrivals(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='homepage'>
      <BestSellers onAdd={onAdd} />
      <ProductCategories />
      <Advertisement />
      <NewArrivals onAdd={onAdd} />
      <Events />
    </div>
  );
}

export default HomePage;
