import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}

/** HOMEPAGE **/

export interface HomePageState {
  bestSellers: Product[];
  newArrivals: Product[];
}

/** PRODUCTS PAGE **/

export interface ProductsPageState {
  chosenProduct: Product | null;
  products: Product[];
}
/** ORDERS PAGE**/
