import React, { ChangeEvent, useEffect, useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  Divider,
  Pagination,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  OutlinedInput,
  //   Checkbox,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Checkbox } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductCard from "../../components/ProductCard";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquery } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductBrand, ProductCategory, ProductTargetUser } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({ products }));

function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquery>({
    page: 1,
    limit: 9,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCategoryHandler = (category: ProductCategory) => {
    productSearch.page = 1;
    productSearch.productCategory = category === "ALL" ? undefined : category;

    setProductSearch({ ...productSearch });
  };
  const handleCategoryChange = (event: any) => {
    searchCategoryHandler(event.target.value);
  };

  const searchBrandHandler = (brand: ProductBrand) => {
    productSearch.page = 1;
    productSearch.productBrand = brand === "ALL" ? undefined : brand;
    setProductSearch({ ...productSearch });
  };

  const handleBrandChange = (event: any) => {
    searchBrandHandler(event.target.value);
  };

  const searchTargetUserHandler = (targetUser: ProductTargetUser) => {
    setProductSearch((prevSearch) => ({
      ...prevSearch,
      page: 1,
      productTargetUser: targetUser === "ALL" ? undefined : targetUser,
    }));
  };

  const handleTargetUserChange = (event: any) => {
    searchTargetUserHandler(event.target.value);
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  const resultCount = products.length;

  return (
    <div className='products'>
      <Container>
        <Stack className='products-section'>
          <Box className='category-title'>Choose your choice</Box>
          <Stack className='products-box'>
            <Stack className='sidebar-frame'>
              <Box className='search-box'>
                <OutlinedInput
                  className='search-input'
                  type='text'
                  name='search'
                  placeholder='Search...'
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchProductHandler();
                    }
                  }}
                />
                <Box className='icon-search' onClick={searchProductHandler}>
                  <SearchIcon />
                </Box>
              </Box>
              {/* <Divider  /> */}
              <Stack>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label' className='checkbox-title'>
                    Category
                  </FormLabel>
                  <RadioGroup
                    onChange={handleCategoryChange}
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    defaultValue='ALL'
                  >
                    <FormControlLabel value='ALL' control={<Radio />} label='All' />
                    <FormControlLabel value='SKINCARE' control={<Radio />} label='Skin Care' />
                    <FormControlLabel value='BODYCARE' control={<Radio />} label='Body Care' />
                    <FormControlLabel value='HAIRCARE' control={<Radio />} label='Hair Care' />
                    <FormControlLabel value='MAKEUP' control={<Radio />} label='Make Up' />
                    <FormControlLabel value='PERFUME' control={<Radio />} label='Perfume' />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label' className='checkbox-title'>
                    Brands
                  </FormLabel>
                  <RadioGroup
                    defaultValue='ALL'
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    onChange={handleBrandChange}
                  >
                    <FormControlLabel value='ALL' control={<Radio />} label='All' />
                    <FormControlLabel value='ILLIYOON' control={<Radio />} label='Illiyoon' />
                    <FormControlLabel value='BELIF' control={<Radio />} label='Belif' />
                    <FormControlLabel value='JIGOTT' control={<Radio />} label='Jigott' />
                    <FormControlLabel value='FARMSTAY' control={<Radio />} label='Farmstay' />
                    <FormControlLabel value='EKEL' control={<Radio />} label='Ekel' />
                    <FormControlLabel value='ANJO' control={<Radio />} label='Anjo' />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label' className='checkbox-title'>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    defaultValue='ALL'
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    onChange={handleTargetUserChange}
                  >
                    <FormControlLabel value='ALL' control={<Radio />} label='All' />
                    <FormControlLabel value='MEN' control={<Radio />} label='Men' />
                    <FormControlLabel value='WOMEN' control={<Radio />} label='Women' />
                    <FormControlLabel value='UNISEX' control={<Radio />} label='Unisex' />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>
            <Stack className='cards-frame'>
              <Box>
                <Divider />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p>{` Total ${resultCount} ${resultCount !== 1 ? "products" : "product"} available`}</p>
                  <Box sx={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
                    <Button
                      variant='contained'
                      color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                      onClick={() => searchOrderHandler("createdAt")}
                    >
                      New
                    </Button>
                    <Button
                      variant='contained'
                      color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                      onClick={() => searchOrderHandler("productPrice")}
                    >
                      Price
                    </Button>
                    <Button
                      variant='contained'
                      color={productSearch.order === "productViews" ? "primary" : "secondary"}
                      onClick={() => searchOrderHandler("productViews")}
                    >
                      Views
                    </Button>
                  </Box>
                </Box>
                <Divider />{" "}
              </Box>
              <Stack className='cards-frame-box'>
                {products.length !== 0 ? (
                  <CssVarsProvider>
                    {products.map((product) => (
                      <ProductCard product={product} key={product?._id} chooseProductHandler={chooseProductHandler} />
                    ))}
                  </CssVarsProvider>
                ) : (
                  <Box className='no-data'> Products are not available!</Box>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack className={"pagination-section"}>
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <img className='image-icon' style={{ position: "absolute", top: "180%" }} src='/icons/bigFace.svg' alt='' />
    </div>
  );
}

export default Products;
