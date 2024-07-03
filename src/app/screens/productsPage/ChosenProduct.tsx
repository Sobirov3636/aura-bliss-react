import React, { useEffect, useState } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import ProductService from "../../services/ProductService";
import { CartItem } from "../../../lib/types/search";
import { productsRetriever } from "./Products";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({ chosenProduct }));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

function ChosenProduct(props: ChosenProductProps) {
  const { onAdd, onRemove } = props;
  const [slideImage, setSlideImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const history = useHistory();
  const { productId } = useParams<{ productId: string }>();
  const { setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { products } = useSelector(productsRetriever);
  console.log("productssss:::", products);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => {
        setChosenProduct(data);
        setSlideImage(data.productImages[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  // HANDLERS

  // CHANGE IMAGE HANDLER
  const changeImageHandler = (image: string) => {
    setSlideImage(image);
  };
  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className='chosen-product'>
      <Container className='product-container'>
        <Stack sx={{ display: "flex", flexDirection: "row", marginBottom: "200px", gap: "100px" }}>
          <Stack className={"images"}>
            <Stack className={"main-image"}>
              <img src={slideImage ? `${serverApi}/${slideImage}` : "/img/product/bigImage.png"} alt={"main-image"} />
            </Stack>
            <Stack className={"sub-images"}>
              {chosenProduct?.productImages.map((subImg: string) => {
                const imagePath: string = `${serverApi}/${subImg}`;
                return (
                  <Stack className={"sub-img-box"} onClick={() => changeImageHandler(subImg)} key={subImg}>
                    <img src={imagePath} alt={"sub-image"} />
                  </Stack>
                );
              })}
            </Stack>
          </Stack>

          <Stack className='product-info'>
            <Box className='name-wrap'>
              <h4 className='product-name'>{chosenProduct?.productName}</h4>
              <Box display={"flex"} alignItems={"center"}>
                <Box className='visibility-box'>
                  <VisibilityIcon sx={{ color: "gray" }} />{" "}
                  <p style={{ marginLeft: "5px" }}>{chosenProduct?.productViews}</p>
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
              <p className='current-price'>${chosenProduct?.productPrice}</p>
              {/* <p className='real-price'>$25 </p>
              <Box className='discount-percent'>
                <p>-50%</p>
              </Box> */}
            </Box>
            <Box className='product-desc'>{chosenProduct?.productDesc}</Box>
            <Divider sx={{ background: "#ccc", height: "1px", margin: "20px 0", width: "100%" }} />
            <Box className='product-size-box'>
              <Box sx={{ fontWeight: "bold" }}>Product Size</Box>
              <Box className='size-detail-box'>
                <Button className='size-detail' variant='contained'>
                  {chosenProduct?.productVolume}ml
                </Button>
                {/* <Button className='size-detail' variant='contained' sx={{ background: "#fff", color: "#000" }}>
                  100ml
                </Button>
                <Button className='size-detail' variant='contained' sx={{ background: "#fff", color: "#000" }}>
                  150ml
                </Button> */}
              </Box>
            </Box>
            <Box className='product-add-box'>
              <Box className='product-quantity'>
                <Remove className='remove-icon' onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))} />
                <p className='quantity'>{quantity}</p>
                <Add className='add-icon' onClick={() => setQuantity((prev) => prev + 1)} />
              </Box>
              <Button
                variant='contained'
                color='secondary'
                className='product-add-btn'
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                }}
              >
                add to cart
              </Button>
            </Box>
          </Stack>
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
                  <ProductCard product={product} onAdd={onAdd} chooseProductHandler={chooseProductHandler} />
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
