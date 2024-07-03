import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquery } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquery): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCategory) url += `&productCategory=${input.productCategory}`;
      if (input.productBrand) url += `&productBrand=${input.productBrand}`;
      if (input.productTargetUser) url += `&productTargetUser=${input.productTargetUser}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("result:", result);
      return result.data;
    } catch (err) {
      console.log("Error, getProducts:", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }
}

export default ProductService;
