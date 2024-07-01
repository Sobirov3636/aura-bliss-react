import React, { useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  Divider,
  Pagination,
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
import { Add, Close, Favorite, FavoriteBorder, Home, Remove } from "@mui/icons-material";
import { serverApi } from "../../lib/config";

interface ProductCardProps {
  product: any;
  chooseProductHandler: any;
}
const ProductCard = (props: ProductCardProps) => {
  const { product, chooseProductHandler } = props;
  // @ts-ignore
  const imagePath =
    product.productImages && product.productImages.length > 0 ? `${serverApi}/${product.productImages[0]}` : "No image";

  const productDate = new Date(product.createdAt);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 90);
  const isNew = productDate > oneWeekAgo;
  return (
    <CssVarsProvider>
      <Card className='card' onClick={chooseProductHandler}>
        <CardOverflow sx={{ position: "relative" }}>
          {isNew && <span className='new'>New</span>}
          {product.productViews > 5 && <span className={`hot ${isNew ? "below-new" : ""}`}>Hot</span>}
          <AspectRatio variant='soft' ratio='9/10' sx={{ minWidth: 200 }}>
            <img className='card-image' style={{ objectFit: "fill" }} src={imagePath} alt='' />
          </AspectRatio>
        </CardOverflow>
        <CardContent className='card-bottom'>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography className='product-name'>{product.productName}</Typography>
            <Box className='product-view'>
              {product.productViews}
              <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
              <Box sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                <p>{0}</p>
                <Favorite sx={{ color: "red", marginLeft: "5px" }} />
              </Box>
            </Box>
          </Stack>
          <Typography className='product-desc'>{product.productDesc ?? "No Description"}</Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography className='product-price'>$ {product.productPrice}</Typography>
            <Box className='shopping-cart-box'>
              <AddShoppingCartIcon className='shopping-cart-icon' />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </CssVarsProvider>
  );
};

export default ProductCard;
