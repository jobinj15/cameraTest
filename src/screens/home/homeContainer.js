import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeMain from './homeMain';
import Products from '../products/products';
import Filter from '../products/Filter';
import ProductDetail from '../products/productDetails';
import ToolBar from '../../components/toolbar';
import constants from '../../utility/constants';

const onBoardStack = createStackNavigator(
  {
    HomeMain: {
      screen: HomeMain,
    },
    Filter: {
      screen: Filter,
    },
    Products: {
      screen: Products,
    },
    ProductDetail: {
      screen: ProductDetail
    },
  },
  {
    initialRouteName: 'HomeMain',
    // navigationOptions: ({ navigation }) => {
    //   return {
    //     HeaderTitle: () =>
    //       <ToolBar
    //         title={constants.APP_NAME}
    //       />
    //   }
    // }

  },
);


const Container = createAppContainer(onBoardStack);

export default Container;
