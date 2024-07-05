import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();
  const location = useLocation();
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
              <NavLink activeStyle={{ color: "#d486d7" }} activeClassName={"underline"} to='/help'>
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Box>
                <Button className='login-btn' variant='contained'>
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className='user-avatar'
                src={authMember?.memberImage ? `${serverApi}/${authMember?.memberImage}` : "/icons/default-user.svg"}
                alt='userImage'
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize='small' style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
