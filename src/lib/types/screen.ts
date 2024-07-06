import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
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
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
