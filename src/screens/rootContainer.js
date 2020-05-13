import React, { Component } from 'react';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import OnBoard from './onboardContainer';
import Home from './MainContainer';
import Login from './onboard/login';
import Splash from '../screens/test/splashtest';

const NavigationStack = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    OnBoard: {
        screen: OnBoard,
    },
    Login: {
        screen: Login,
    },
    Home: {
        screen: Home,
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

const MainContainer = createAppContainer(NavigationStack);

export default MainContainer; 