import React, { Component } from 'react';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './MainScreen'; 


const NavigationStack = createStackNavigator({
    Main: { 
        screen: MainScreen,
    },
    
    About: { 
        screen: MainScreen,
    },
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
},);

const MainContainer = createAppContainer(NavigationStack);

export default MainContainer; 