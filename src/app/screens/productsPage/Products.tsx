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

function Products() {
  const newArrivals = [
    { name: "Tamburine", image: "/img/tamburine.jpeg" },
    { name: "Zarkoperfume", image: "/img/zarkoperfume.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
    { name: "Wisteria", image: "/img/sunscren1.jpeg" },
  ];

  return (
    <div className='products'>
      <Container>
        <Stack className='products-section'>
          <Box className='category-title'>Choose your choice</Box>
          <Stack className='products-box'>
            <Stack className='sidebar-frame'>
              <Box className='search-box'>
                <input className='search-input' type='text' name='search' placeholder='Search...' />
                <Box className='icon-search'>
                  <SearchIcon />
                </Box>
              </Box>
              {/* <Divider  /> */}
              <Stack>
                <Box className='checkbox-title'>Categories</Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: "15px" }}>
                  <CssVarsProvider>
                    <Checkbox label='Skin Care' size='md' />
                    <Checkbox label='Body Care' size='md' />
                    <Checkbox label='Hair Care' size='md' />
                    <Checkbox label='Make Up' size='md' />
                    <Checkbox label='Perfume' size='md' />
                    {/* <Divider /> */}
                  </CssVarsProvider>
                </Box>

                <Box className='checkbox-title'>Brands</Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: "15px" }}>
                  <CssVarsProvider>
                    <Checkbox label='Chanel' size='md' />
                    <Checkbox label='Olivie' size='md' />
                    <Checkbox label='test1' size='md' />
                    <Checkbox label='test2' size='md' />
                    <Checkbox label='test3' size='md' />
                    {/* <Divider /> */}
                  </CssVarsProvider>
                </Box>

                <Box className='checkbox-title'>Gender</Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: "15px" }}>
                  <CssVarsProvider>
                    <Checkbox label='Men' size='md' />
                    <Checkbox label='Women' size='md' />
                    {/* <Divider /> */}
                  </CssVarsProvider>
                </Box>
              </Stack>
            </Stack>
            <Stack className='cards-frame'>
              <Box>
                <Divider />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p>Showing 1-12 of results</p>
                  <Box sx={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
                    <Button variant='contained'>New</Button>
                    <Button variant='contained' color='secondary'>
                      Price
                    </Button>
                    <Button variant='contained' color='secondary'>
                      Views
                    </Button>
                  </Box>
                </Box>
                <Divider />{" "}
              </Box>
              <Stack className='cards-frame-box'>
                {newArrivals.length !== 0 ? (
                  <CssVarsProvider>
                    {newArrivals.map((product, index) => (
                      <Card className='card'>
                        <CardOverflow sx={{ position: "relative" }}>
                          <span className='new'>New</span>
                          <AspectRatio variant='soft' ratio='9/10' sx={{ minWidth: 200 }}>
                            <img className='card-image' style={{ objectFit: "fill" }} src={product.image} alt='' />
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
                            <Typography className='product-name'>{product.name}</Typography>
                            <Box className='product-view'>
                              5
                              <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
                            </Box>
                          </Stack>
                          <Typography className='product-desc'>This is a good product for you</Typography>
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography className='product-price'>$ 15</Typography>
                            <Box className='shopping-cart-box'>
                              <AddShoppingCartIcon className='shopping-cart-icon' />
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </CssVarsProvider>
                ) : (
                  <Box className='no-data'>New Arrival products are not available!</Box>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
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
            />
          </Stack>
        </Stack>
      </Container>
      <img className='image-icon' src='/icons/bigFace.svg' alt='' />
    </div>
  );
}

export default Products;
