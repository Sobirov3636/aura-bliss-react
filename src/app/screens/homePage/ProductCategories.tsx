import React from "react";
import { Box, Container, Stack } from "@mui/material";

import Typography from "@mui/joy/Typography";

function ProductCategories() {
  return (
    <div className='product-categories-frame'>
      <Container>
        <Stack className='main'>
          <Box className='category-title'>Shop By Category</Box>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
          <Stack className='main-frame'>
            <Box>
              <img className='image-box' src='/img/category.jpeg' alt='' />
            </Box>
            <Typography className='description'>Skin Care</Typography>
          </Stack>

          <Stack className='main-frame'>
            <Box>
              <img className='image-box' src='/img/body.jpeg' alt='' />
            </Box>
            <Typography className='description'>Body Care</Typography>
          </Stack>

          <Stack className='main-frame'>
            <Box>
              <img className='image-box' src='/img/makeup.jpeg' alt='' />
            </Box>
            <Typography className='description'>Make Up</Typography>
          </Stack>

          <Stack className='main-frame'>
            <Box>
              <img className='image-box' src='/img/haircare.png' alt='' />
            </Box>
            <Typography className='description'>Hair Care</Typography>
          </Stack>

          <Stack className='main-frame'>
            <Box>
              <img className='image-box' src='/img/parfumecare.webp' alt='' />
            </Box>
            <Typography className='description'>Parfume</Typography>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default ProductCategories;
