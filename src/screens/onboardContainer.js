import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splashscreen from './SplashScreen';
import Signin from './onboard/login';
import Signup from './onboard/signup';
import Otp from './onboard/otp';
import Forgot from './onboard/forgot';

import Icon from 'react-native-vector-icons/Ionicons';



const onBoardStack = createStackNavigator(
  {
    Signin: {
      screen: Signin,
    },
    Signup: {
      screen: Signup,
    },
    Forgot: {
      screen: Forgot,
    },
    Otp: {
      screen: Otp,
    },
  },
  {
    initialRouteName: 'Signin',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Container = createAppContainer(onBoardStack);

export default Container;
