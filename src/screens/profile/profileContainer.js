import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyOrders from './myOrders';
import OrderDetails from './OrderDetails';
import ProfileList from './profileList';
import Addresses from './Addresses';
import AddAddress from './AddAddress';

const onBoardStack = createStackNavigator(
  { 
    MyOrders: {
      screen: MyOrders,
    },
    OrderDetails: {
      screen: OrderDetails,
    },
    ProfileList: {
      screen: ProfileList,
    },
    Addresses: {
      screen: Addresses,
    },
    AddAddress: {
      screen: AddAddress,
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
