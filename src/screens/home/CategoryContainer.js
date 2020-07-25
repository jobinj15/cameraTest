import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Categories from './categories';
import Products from '../products/products';
import Filter from '../products/Filter';
import ProductDetail from '../products/productDetails';


const onBoardStack = createStackNavigator(
  {
    Categories: {
      screen: Categories,
    },
    Filter: {
      screen: Filter,
    },
    Products: {
      screen: Products,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
  },
  {
    initialRouteName: 'Categories',
  },
);



const Container = createAppContainer(onBoardStack);

export default Container;
