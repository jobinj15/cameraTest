import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import HomeContainer from './home/homeContainer';
import ProfileContainer from './profile/profileContainer';
import ColorsTab from './home/colorsTab';
import BodyChart from './test/bodychart';
import LottieExample from './test/lottie_test';
import Counter from './home/Counter';
import Cart from './cart/cart';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

class MainScreenC extends Component{
  constructor(props) {
 
    super(props);

     YellowBox.ignoreWarnings(
  
      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
      
    ]);

  }
  componentDidMount(){
    console.log('codid');
    this.props.navigation.setParams({count:50});
  }

}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  // static navigationOptions = {
  //   headerLeft: <Icon name="ios-home" style={{paddingLeft: 10}} />,
  //   title: 'Grocerie`',
  //   headerRight: <Icon style={{paddingRight: 10}} name="ios-home" />,
  // };

 const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    let IconComponent = Icon;
    let iconName;
    if (routeName === 'Home') {
      iconName = 'ios-home';
    } else if (routeName === 'Profile') {
      iconName = 'ios-contact';
    } 
    else if (routeName === 'Cart') {
      iconName = 'ios-cart';
    }
    else if (routeName === 'Search') {
      iconName = 'ios-search';
    }
  
    return <IconComponent name={iconName} size={25} color={tintColor} />;
  };

 const BottomTabNavigator = createMaterialTopTabNavigator(
    {
      Home:  HomeContainer,
      Cart:  Cart,
      Profile: ProfileContainer,
      Search: ColorsTab,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarPosition: 'bottom',
        tabBarIcon: ({focused, tintColor}) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        showIcon : true,
        showLabel : false,
        style:{
          backgroundColor : colors.WHITE,
          height:48
        }
      },
    },
  );

  
  const NavigationStack1 = createStackNavigator(
    {          
      MainScreen: {
          screen: BottomTabNavigator,          
          navigationOptions: ({navigation}) => ({            
            headerLeft: <Icon name="ios-home" size={25} style={{paddingLeft: 16}} />,
            title: 'Grocerie',
            headerRight: <Counter/>
          })
        },
    }
  );




// const MainScreen1 = createAppContainer(MainScreen);

export default NavigationStack1;

// export default MainScreen1;
