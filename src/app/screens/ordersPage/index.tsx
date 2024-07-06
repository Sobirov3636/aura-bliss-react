import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquery } from "../../../lib/types/order";
import "../../../css/order.css";
import OrderService from "../../services/OrdersService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const history = useHistory();
  const { orderBuilder, authMember } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquery, setOrderInquery] = useState<OrderInquery>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquery, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className={"order-page"}>
      <Container className='order-container'>
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' className={"table_list"}>
                  <Tab label='PAUSED ORDERS' value={"1"} />
                  <Tab label='PROCESS ORDERS' value={"2"} />
                  <Tab label='FINISHED ORDERS' value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img alt='' src={"/icons/default-user.svg"} className={"order-user-avatar"} />
                <div className={"order-user-icon-box"}>
                  <img alt='' src={"/icons/user-badge.svg"} className={"order-user-prof-img"} />
                </div>
              </div>
              <span className={"order-user-name"}>Ali</span>
              <span className={"order-user-prof"}>User</span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec-address-txt"}>Do not exist</div>
            </Box>
          </Box>
          <Box className={"order-info-box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"cardNumber"}
              placeholder={"Card number : **** 4090 2002 7495"}
              className={"card-input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input type={"text"} name={"cardPeriod"} placeholder={"07 / 24"} className={"card-half-input"} />
              <input type={"text"} name={"cardCVV"} placeholder={"CVV : 010"} className={"card-half-input"} />
            </div>
            <input type={"text"} name={"cardCreator"} placeholder={"Justin Robertson"} className={"card-input"} />
            <div className={"cards-box"}>
              <img alt='' src={"/icons/western-card.svg"} />
              <img alt='' src={"/icons/master-card.svg"} />
              <img alt='' src={"/icons/paypal-card.svg"} />
              <img alt='' src={"/icons/visa-card.svg"} />
            </div>
          </Box>
        </Stack>
        <Box className='girl-icon'>
          <img src='icons/facewithflower4.svg' height={450} width={370} alt='' />
        </Box>
      </Container>
    </div>
  );
}

export default OrdersPage;
