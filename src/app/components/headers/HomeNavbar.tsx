import React from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
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

function HomeNavbar(props: HomeNavbarProps) {
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
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Box>
                <Button className='login-btn' variant='contained' onClick={() => setLoginOpen(true)}>
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
