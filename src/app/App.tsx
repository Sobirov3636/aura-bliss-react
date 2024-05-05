import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import "../css/app.css";
import { RippleBadge } from "./MaterialTheme/styled";
import { Route, Switch } from "react-router-dom";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";

function App() {
  return (
    <Switch>
      <Route path='/products'>
        <ProductsPage />
      </Route>
      <Route path='/orders'>
        <OrdersPage />
      </Route>
      <Route path='/member-page'>
        <UserPage />
      </Route>
      <Route path='/help'>
        <HelpPage />
      </Route>
      <Route path='/'>
        <HomePage />
      </Route>
    </Switch>
  );
}

export default App;
