import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Cart from './cart';
import SelectAddress from './SelectAddress';
import SelectPayment from './SelectPayment';
import OrderSuccess from './OrderSuccess';

const onBoardStack = createStackNavigator(
  {
    Cart: {
      screen: Cart,
    },
    SelectAddress: {
      screen: SelectAddress,
    },
    SelectPayment: {
      screen: SelectPayment,
    },
    OrderSuccess: {
      screen: OrderSuccess,
    },
  },
  {
    

  },
);

const Container = createAppContainer(onBoardStack);

export default Container;
