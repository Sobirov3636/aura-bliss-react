import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Basket from "./Basket";

function OtherNavbar() {
  const location = useLocation();
  const authMember = null;
  return (
    <div className='other-navbar'>
      <Container className='navbar-container'>
        <Stack className='menu'>
          <Box>
            <NavLink to='/'>
              <img className='brand-logo' src='/img/Logo.svg' alt='' />
            </NavLink>
          </Box>
          <Stack className='links'>
            <Box className={"hover-line"}>
              <NavLink to='/'>Home</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink activeClassName={"underline"} to='/products'>
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink activeClassName={"underline"} to='/orders'>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink activeClassName={"underline"} to='/member-page'>
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink activeClassName={"underline"} to='/help'>
                Help
              </NavLink>
            </Box>
            <Basket />

            {!authMember ? (
              <Box>
                <Button className='login-btn' variant='contained'>
                  Login
                </Button>
              </Box>
            ) : (
              <img className='user-avatar' src={"/icons/default-user.svg"} alt='userImage' aria-haspopup={"true"} />
            )}
          </Stack>
        </Stack>
        {location.pathname === "/products" ? (
          <Box className='main-text' sx={{ width: "300px" }}>
            Products
          </Box>
        ) : location.pathname === "/help" ? (
          <Box className='main-text' sx={{ width: "300px" }}>
            Help
          </Box>
        ) : location.pathname === "/orders" ? (
          <Box className='main-text' sx={{ width: "300px" }}>
            Orders
          </Box>
        ) : location.pathname === "/member-page" ? (
          <Box className='main-text' sx={{ width: "300px" }}>
            My Page
          </Box>
        ) : location.pathname.startsWith("/products/") ? (
          <Box className='main-text' sx={{ width: "351px" }}>
            Product Detail
          </Box>
        ) : null}

        <img className='flowers' src='/icons/flowers.svg' alt='' />
        <img className='flower-face' src='/icons/flower&face.svg' alt='' />
        <img className='butterfly-icon-3' src='/icons/butterfly3.svg' alt='' />
      </Container>
    </div>
  );
}

export default OtherNavbar;
