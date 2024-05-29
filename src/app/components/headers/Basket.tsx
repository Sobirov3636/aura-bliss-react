import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { Badge, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const cartItems = [{ name: "test" }];
export default function Basket() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className='basket-box'>
      <IconButton
        color='default'
        aria-label='cart'
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={3} color='secondary'>
          <ShoppingCartIcon className='shopping-cart' />
        </Badge>
      </IconButton>
      <Dialog maxWidth='md' onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"} alignItems={"center"}>
                <div>Cart Products:</div>
                <DeleteForeverIcon sx={{ cursor: "pointer", color: "#0f0e0e", ml: "5px" }} />
              </Stack>
            )}
          </Box>

          <TableContainer className='basket-info-box' sx={{ my: 2 }}>
            <Table size='small'>
              {/* HEAD */}
              <TableHead>
                <TableRow sx={{ height: "45px" }}>
                  <TableCell className='table-cell'>Proudct</TableCell>
                  <TableCell className='table-cell'>Name</TableCell>
                  <TableCell className='table-cell'>Quantity</TableCell>
                  <TableCell className='table-cell'>Price</TableCell>
                  <TableCell className='table-cell'>Remove</TableCell>
                </TableRow>
              </TableHead>

              {/* BODY */}
              <TableBody className='table-body'>
                <TableRow sx={{ height: "45px" }}>
                  <TableCell>
                    {" "}
                    <img className='product-img' src='/img/suncreem2.jpeg' alt='' />
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 20px" }}>Suncream</TableCell>
                  <TableCell sx={{ fontSize: "15px", padding: "6px 25px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <KeyboardArrowLeftIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }} />
                      <span style={{ margin: "0 5px", fontSize: "17px" }}>2</span>
                      <KeyboardArrowRightIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }} />
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 35px" }}> $ 2</TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 50px" }}>
                    <CancelIcon color={"primary"} sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ height: "45px" }}>
                  <TableCell>
                    {" "}
                    <img className='product-img' src='/img/parfumeadras.jpeg' alt='' />
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 20px" }}>Parfume</TableCell>
                  <TableCell sx={{ fontSize: "15px", padding: "6px 25px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <KeyboardArrowLeftIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }} />
                      <span style={{ margin: "0 5px", fontSize: "17px" }}>1</span>
                      <KeyboardArrowRightIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }} />
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 35px" }}> $ 10</TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 50px" }}>
                    <CancelIcon color={"primary"} sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>

                <TableRow sx={{ height: "45px" }}>
                  <TableCell>
                    {" "}
                    <img className='product-img' src='/img/parfumeadras.jpeg' alt='' />
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 20px" }}>Parfume</TableCell>
                  <TableCell sx={{ fontSize: "15px", padding: "6px 25px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <KeyboardArrowLeftIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }} />
                      <span style={{ margin: "0 5px", fontSize: "17px" }}>1</span>
                      <KeyboardArrowRightIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }} />
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 35px" }}> $ 10</TableCell>
                  <TableCell sx={{ fontSize: "17px", padding: "6px 50px" }}>
                    <CancelIcon color={"primary"} sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box className={"basket-order"}>
            <Button variant={"contained"} color='error' onClick={handleClose}>
              Cancel
            </Button>
            <span style={{ fontSize: "20px" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>Total:</span> $100 (98 +2)
            </span>
            <Button startIcon={<ShoppingCartIcon />} variant={"contained"} color='info'>
              Order
            </Button>
          </Box>
        </Stack>
      </Dialog>
    </Box>
  );
}
