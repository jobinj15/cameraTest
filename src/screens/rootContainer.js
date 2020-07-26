import React, { Component } from 'react';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './Splash';
import Camera from './Camera';

const NavigationStack = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    Camera : {
        screen: Camera
    }
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