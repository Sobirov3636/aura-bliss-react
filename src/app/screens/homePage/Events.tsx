import React from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
const plans = [
  {
    title: 10,
    desc: "Discount On All Make Up Products",
    img: "/img/event1.jpeg",
  },
  {
    title: "From $120",
    desc: "Foot or Hand Cream As A Gift",
    img: "/img/footcream.webp",
  },
  {
    title: 40,
    desc: "All Skin Products",
    img: "/img/eventskin.avif",
  },
  {
    title: "Soon",
    desc: " New Korean Products are Coming",
    img: "/img/coming.webp",
  },
];

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Events</span>
        </Box>

        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        >
          {plans.map((value, number) => {
            {
              console.log(typeof +value.title);
            }

            return (
              <SwiperSlide key={number} className={"events-info-frame"}>
                <div className={"events-img"}>
                  <img src={value.img} className={"events-img"} />
                </div>
                <Box className={"events-desc"}>
                  <Box className='desc-title'>
                    {value.title}
                    {typeof value.title === "number" ? (
                      <img
                        style={{ marginLeft: "5px", marginTop: "5px" }}
                        height={50}
                        width={50}
                        src='/img/discount.png'
                        alt=''
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box className='desc-text'>{value.desc}</Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box className={"prev-next-frame"}>
          <img src={"/icons/arrow-right.svg"} className={"swiper-button-prev"} />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            style={{ transform: "rotate(-180deg)" }}
          />
        </Box>
      </Stack>
    </div>
  );
}
