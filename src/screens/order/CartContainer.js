import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Cart from './cart';
import ApplyCoupon from './ApplyCoupon';
import SelectAddress from './SelectAddress';
import SelectPayment from './SelectPayment';
import AddAddress from '../profile/AddAddress';
import AddressList from '../profile/AddressList';
import OrderSuccess from './OrderSuccess';
import PayWithPayU from './PayWithPayU';

const onBoardStack = createStackNavigator({
    ApplyCoupon: {
        screen: ApplyCoupon,
    },
    Cart: {
        screen: Cart,
    },
    PayWithPayU: {
        screen: PayWithPayU,
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
    AddAddress: {
        screen: AddAddress,
    },
    AddressList: {
        screen: AddressList,
    },
}, {
    initialRouteName: 'Cart',
}, );

const Container = createAppContainer(onBoardStack);

export default Container;