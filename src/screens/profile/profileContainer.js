import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyOrders from './myOrders';
import ProfileList from './profileList';

const onBoardStack = createStackNavigator(
  { 
    MyOrders: {
      screen: MyOrders,
    },
    ProfileList: {
      screen: ProfileList,
    },
  },
  {
    initialRouteName: 'ProfileList',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Container = createAppContainer(onBoardStack);

export default Container;
