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
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrdersService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}
export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember } = useGlobals();
  const history = useHistory();

  const itemsPrice: number = cartItems.reduce((a: number, c: CartItem) => a + c.quantity * c.price, 0);
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);
      onDeleteAll();

      // REFRESH VIA CONTEXT
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
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
        <Badge badgeContent={cartItems.length} color='secondary'>
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
                <DeleteForeverIcon
                  sx={{ cursor: "pointer", color: "#0f0e0e", ml: "5px" }}
                  onClick={() => onDeleteAll()}
                />
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
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <TableBody className='table-body'>
                    <TableRow sx={{ height: "45px" }}>
                      <TableCell>
                        {" "}
                        <img className='product-img' src={imagePath} alt='' />
                      </TableCell>
                      <TableCell sx={{ fontSize: "17px", padding: "6px 20px" }}>{item.name}</TableCell>
                      <TableCell sx={{ fontSize: "15px", padding: "6px 25px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <KeyboardArrowLeftIcon
                            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
                            onClick={() => onRemove(item)}
                          />
                          <span style={{ margin: "0 5px", fontSize: "17px" }}>{item.quantity}</span>
                          <KeyboardArrowRightIcon
                            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
                            onClick={() => onAdd(item)}
                          />
                        </div>
                      </TableCell>
                      <TableCell sx={{ fontSize: "17px", padding: "6px 35px" }}> $ {item.price}</TableCell>
                      <TableCell sx={{ fontSize: "17px", padding: "6px 50px" }}>
                        <CancelIcon color={"primary"} sx={{ cursor: "pointer" }} onClick={() => onDelete(item)} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>

          {cartItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <Button variant={"contained"} color='error' onClick={handleClose}>
                Cancel
              </Button>
              <span style={{ fontSize: "20px" }}>
                {" "}
                <span style={{ fontWeight: "bold" }}>Total:</span> {totalPrice} ({itemsPrice} + {shippingCost})
              </span>
              <Button startIcon={<ShoppingCartIcon />} variant={"contained"} color='secondary'>
                Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Dialog>
    </Box>
  );
}
