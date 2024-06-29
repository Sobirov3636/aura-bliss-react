import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
}

/** HOMEPAGE **/

export interface HomePageState {
  bestSellers: Product[];
  newArrivals: Product[];
}

/** PRODUCTS PAGE **/
/** ORDERS PAGE**/
