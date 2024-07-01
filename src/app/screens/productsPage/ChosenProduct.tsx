import React, { useState } from "react";
import { Box, Button, Container, Divider, Rating, Stack, useTheme } from "@mui/material";
import { Add, Close, Favorite, FavoriteBorder, Home, Remove } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { CssVarsProvider } from "@mui/joy";
import ProductCard from "../../components/ProductCard";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setChosenProduct, setProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveProducts } from "./selector";
import { Member } from "../../../lib/types/member";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({ chosenProduct }));

const products = [
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

function ChosenProduct() {
  const history = useHistory();
  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  const images = [
    { imgUrl: "/img/sunscren1.jpeg" },
    { imgUrl: "/img/suncreem2.jpeg" },
    { imgUrl: "/img/suncream5.jpeg" },
    { imgUrl: "/img/tamburine.jpeg" },
    { imgUrl: "/img/whitening1.jpeg" },
  ];
  const [thumbsSwiper, setThumbsSwiper] = useState();
  return (
    <div className='chosen-product'>
      <Container className='product-container'>
        {/* 
        <Stack className='product-image-box'>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper2'
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img.imgUrl} alt='Pruduct Image' />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            // @ts-ignore
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper'
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className='product-images-slider-thumbs-wrapper'>
                  <img src={img.imgUrl} alt='Pruduct Image' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
         */}
        <Stack className='product-info'>
          <Box className='name-wrap'>
            <h4 className='product-name'>Product Name</h4>
            <Box display={"flex"} alignItems={"center"}>
              <Box className='visibility-box'>
                <VisibilityIcon sx={{ color: "gray" }} /> <p style={{ marginLeft: "5px" }}>5</p>
              </Box>
              <Favorite style={{ color: "red" }} />
            </Box>
          </Box>
          <Box className='rating-box'>
            <Rating size='small' sx={{ marginRight: "5px" }} defaultValue={2.5} precision={0.5} />
            <p style={{ fontSize: "14px", color: "#4f6f77" }}>Reviews(15)</p>
          </Box>
          <Divider sx={{ background: "#ccc", height: "1px", margin: "10px 0", width: "100%" }} />

          <Box className='price-box'>
            <p className='current-price'>$12.5</p>
            <p className='real-price'>$25 </p>
            <Box className='discount-percent'>
              <p>-50%</p>
            </Box>
          </Box>
          <Box className='product-desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi rerum quibusdam distinctio eum rem, ad,
            blanditiis modi enim eaque, officia voluptatem? Dolore tempora totam exercitationem dolorum sed eum eaque?
          </Box>
          <Divider sx={{ background: "#ccc", height: "1px", margin: "20px 0", width: "100%" }} />
          <Box className='product-size-box'>
            <Box sx={{ fontWeight: "bold" }}>Product Size</Box>
            <Box className='size-detail-box'>
              <Button className='size-detail' variant='contained'>
                50ml
              </Button>
              <Button className='size-detail' variant='contained' sx={{ background: "#fff", color: "#000" }}>
                100ml
              </Button>
              <Button className='size-detail' variant='contained' sx={{ background: "#fff", color: "#000" }}>
                150ml
              </Button>
            </Box>
          </Box>
          <Box className='product-add-box'>
            <Box className='product-quantity'>
              <Remove className='remove-icon' />
              <p className='quantity'>1</p>
              <Add className='add-icon' />
            </Box>
            <Button variant='contained' color='secondary' className='product-add-btn'>
              add to cart
            </Button>
          </Box>
        </Stack>
        <Stack className='cards-frame'>
          <Box className='title'>Related Products </Box>
          <Stack className='cards-frame-box'>
            <Swiper
              className='related-products-swiper'
              spaceBetween={20}
              slidesPerView={4}
              navigation={true}
              modules={[Navigation]}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} chooseProductHandler={chooseProductHandler} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default ChosenProduct;
