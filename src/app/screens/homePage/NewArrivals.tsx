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
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewArrivals } from "./selector";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const newArrivalsRetriever = createSelector(retrieveNewArrivals, (newArrivals) => ({ newArrivals }));

function NewArrivals() {
  const { newArrivals } = useSelector(newArrivalsRetriever);
  const history = useHistory();
  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  console.log("newArrivals:", newArrivals);

  return (
    <div className='best-sellers-frame'>
      <Container>
        <Stack className='best-section'>
          <Box className='category-title'>New Arrivals</Box>
          <Stack className='cards-frame'>
            {newArrivals.length !== 0 ? (
              <CssVarsProvider>
                {newArrivals.map((product) => (
                  <ProductCard product={product} chooseProductHandler={chooseProductHandler} key={product._id} />
                  // <Card className='card'>
                  //   <CardOverflow sx={{ position: "relative" }}>
                  //     <span className='new'>New</span>
                  //     <AspectRatio variant='soft' ratio='4/5' sx={{ minWidth: 200 }}>
                  //       <img style={{ objectFit: "fill" }} src={product.image} alt='' />
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
                  //       <Typography className='product-name'>{product.name}</Typography>
                  //       <Box className='product-view'>
                  //         5
                  //         <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
                  //       </Box>
                  //     </Stack>
                  //     <Typography className='product-desc'>This is a good product for you</Typography>
                  //     <Typography className='product-price'>$ 15</Typography>
                  //   </CardContent>
                  // </Card>
                ))}
              </CssVarsProvider>
            ) : (
              <Box className='no-data'>New Arrival products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default NewArrivals;
