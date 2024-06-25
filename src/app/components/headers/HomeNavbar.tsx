import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";

function HomeNavbar() {
  const authMember = null;
  return (
    <div className='home-navbar'>
      <Container className='navbar-container'>
        <Stack className='menu'>
          <Box>
            <NavLink to='/'>
              <img className='brand-logo' src='/img/Logo.svg' alt='' />
            </NavLink>
          </Box>
          <Stack className='links'>
            <Box className={"hover-line"}>
              <NavLink activeStyle={{ color: "#d486d7" }} activeClassName={"underline"} to='/'>
                Home
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink activeStyle={{ color: "#d486d7" }} activeClassName={"underline"} to='/products'>
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink activeStyle={{ color: "#d486d7" }} activeClassName={"underline"} to='/orders'>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink activeStyle={{ color: "#d486d7" }} activeClassName={"underline"} to='/member-page'>
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink activeStyle={{ color: "#d486d7" }} to='/help'>
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

        <Stack>
          <Box>
            <img className='makeup' src='/icons/makeup.svg' alt='' />
          </Box>
          <Box className='marketing-wrapper'>
            <img className='marketing-image' src='/img/kores.png' alt='' />
          </Box>
          <Box>
            <img className='butterfly-icon' src='icons/butterfly.svg' alt='' />
          </Box>
          <Box>
            <img className='rose-1' src='/icons/rose1.svg' alt='' />
          </Box>
          <Box>
            {" "}
            <img className='rose-2' src='/icons/rose2.svg' alt='' />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default HomeNavbar;
