import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { useHistory } from "react-router-dom";

function ProductCategories() {
  const history = useHistory();

  const handleCategoryClick = (category: string) => {
    // history.push(`/products`);
    window.location.href = `/products`;
  };

  return (
    <div className='product-categories-frame'>
      <Container>
        <Stack className='main'>
          <Box className='category-title'>Shop By Category</Box>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
          <Stack className='main-frame' onClick={() => handleCategoryClick("SKINCARE")}>
            <Box>
              <img className='image-box' src='/img/category.jpeg' alt='' />
            </Box>
            <Typography className='description'>Skin Care</Typography>
          </Stack>

          <Stack className='main-frame' onClick={() => handleCategoryClick("BODYCARE")}>
            <Box>
              <img className='image-box' src='/img/body.jpeg' alt='' />
            </Box>
            <Typography className='description'>Body Care</Typography>
          </Stack>

          <Stack className='main-frame' onClick={() => handleCategoryClick("MAKEUP")}>
            <Box>
              <img className='image-box' src='/img/makeup.jpeg' alt='' />
            </Box>
            <Typography className='description'>Make Up</Typography>
          </Stack>

          <Stack className='main-frame' onClick={() => handleCategoryClick("HAIRCARE")}>
            <Box>
              <img className='image-box' src='/img/haircare.png' alt='' />
            </Box>
            <Typography className='description'>Hair Care</Typography>
          </Stack>

          <Stack className='main-frame' onClick={() => handleCategoryClick("PERFUME")}>
            <Box>
              <img className='image-box' src='/img/parfumecare.webp' alt='' />
            </Box>
            <Typography className='description'>Perfume</Typography>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default ProductCategories;
