import { ProductBrand, ProductCategory, ProductStatus, ProductTargetUser } from "../enums/product.enum";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productTargetUser: ProductTargetUser;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productVolume: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquery {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  productBrand?: ProductBrand;
  productTargetUser?: ProductTargetUser;
  search?: string;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productCategory: ProductCategory;
  productTargetUser: ProductTargetUser;
  productBrand: ProductBrand;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productVolume: number;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}

export interface ProductUpdateInput {
  _id: string;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  productTargetUser?: ProductTargetUser;
  productName?: string;
  productPrice?: number;
  productLeftCount?: number;
  productVolume?: number;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}
