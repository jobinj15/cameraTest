import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Signin from './onboard/login';
import MainScreen from './MainScreen';
import Splash from '../screens/Splash';
import Signup from './onboard/signup';
import Forgot from './onboard/forgot';

import Icon from 'react-native-vector-icons/Ionicons';


// const getTabBarIcon = (navigation, focused, tintColor) => {
//     const {routeName} = navigation.state;
//     let IconComponent = Icon;
//     let iconName;
//     if (routeName === 'Home') {
//       iconName = 'ios-home';
//     } else if (routeName === 'Profile') {
//       iconName = 'ios-contact';
//     } else if (routeName === 'Search') {
//       iconName = 'ios-search';
//     }
  
//     return <IconComponent name={iconName} size={25} color={tintColor} />;
//   };


// const BottomTabNavigator = createBottomTabNavigator(
//     {
//       Home: Signin,
//       Profile: Signup,
//       Search: Forgot,
//     },
//     {
//       defaultNavigationOptions: ({navigation}) => ({
//         tabBarPosition: 'bottom',
//         swipeEnabled: true,
//         animationEnabled: true,
//         tabBarIcon: ({focused, tintColor}) =>
//           getTabBarIcon(navigation, focused, tintColor),
//       }),
//       tabBarOptions: {
//         activeTintColor: 'black',
//         inactiveTintColor: 'gray',
//       },
//     },
//   );


const NavigationStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
    },
    MainScreen: {
      screen: MainScreen,
    },
    Signin: {
      screen: Signin,
    },
    Signup: {
      screen: Signup,
    },
    Forgot: {
      screen: Forgot,
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Container = createAppContainer(NavigationStack);

export default Container;
