import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestSellers } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCategory } from "../../../lib/enums/product.enum";
import ProductCard from "../../components/ProductCard";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/

const bestSellersRetriever = createSelector(retrieveBestSellers, (bestSellers) => ({ bestSellers }));

const bestSellers = [
  { name: "Tamburine", image: "/img/tamburine.jpeg" },
  { name: "Zarkoperfume", image: "/img/zarkoperfume.jpeg" },
  { name: "Wisteria", image: "/img/sunscren1.jpeg" },
  { name: "Dr Vita", image: "/img/suncream5.jpeg" },
];

function BestSellers() {
  const { bestSellers } = useSelector(bestSellersRetriever);
  const history = useHistory();
  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className='best-sellers-frame'>
      <Container>
        <Stack className='best-section'>
          <Box className='category-title'>Best Sellers</Box>
          <Stack className='cards-frame'>
            {bestSellers.length !== 0 ? (
              <CssVarsProvider>
                {/* Render best sellers */}
                {bestSellers.map((product) => {
                  return (
                    <ProductCard product={product} chooseProductHandler={chooseProductHandler} key={product._id} />
                    // <Card className='card'>
                    //   <CardOverflow>
                    //     <AspectRatio variant='soft' ratio='4/5' sx={{ minWidth: 200 }}>
                    //       <img style={{ objectFit: "fill" }} src={imagePath} alt='' />
                    //     </AspectRatio>
                    //   </CardOverflow>
                    //   <CardContent className='card-bottom'>
                    //     <Stack
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         alignItems: "center",
                    //         justifyContent: "space-between",
                    //       }}
                    //     >
                    //       <Typography className='product-name'>{product.productName}</Typography>
                    //       <Box className='product-view'>
                    //         {product.productViews}
                    //         <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
                    //       </Box>
                    //     </Stack>
                    //     <Typography className='product-desc'>{product.productDesc ?? "No Description"}</Typography>
                    //     <Typography className='product-price'>$ {product.productPrice}</Typography>
                    //   </CardContent>
                    // </Card>
                  );
                })}
              </CssVarsProvider>
            ) : (
              <Box className='no-data'>Best Seller products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default BestSellers;
