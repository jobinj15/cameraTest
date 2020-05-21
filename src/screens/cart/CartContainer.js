import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Cart from './cart';

const onBoardStack = createStackNavigator(
  {
    Cart: {
      screen: Cart,
    },
  },
  {
    

  },
);

const Container = createAppContainer(onBoardStack);

export default Container;
