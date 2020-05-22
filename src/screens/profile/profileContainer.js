import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyOrders from './myOrders';
import OrderDetails from './OrderDetails';
import ProfileList from './profileList';
import Addresses from './AddressList';
import AddAddress from './AddAddress';

const onBoardStack = createStackNavigator(
  { 
    ProfileList: {
      screen: ProfileList,
    },
    MyOrders: {
      screen: MyOrders,
    },
    OrderDetails: {
      screen: OrderDetails,
    },
    Addresses: {
      screen: Addresses,
    },
    AddAddress: {
      screen: AddAddress,
    },
  },
  {
    // initialRouteName: 'ProfileList',
    // headerMode: 'none',
    // navigationOptions: {
    //   headerVisible: false,
    // },
  },
);

const Container = createAppContainer(onBoardStack);

export default Container;
