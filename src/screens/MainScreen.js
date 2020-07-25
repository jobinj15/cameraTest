import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { createStackNavigator, Header, HeaderTitle } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { Avatar, AvatarHelper, Typography } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import styles from '../styles/style';
import ToolBar from '../components/toolbar';
import global from '../utility/global';
import CartBubble from './CartBubble';

class MainScreenC extends Component {
  constructor(props) {

    super(props);

    YellowBox.ignoreWarnings(

      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'

      ]);

  }
  componentDidMount() {
    console.log('codid');
    this.props.navigation.setParams({ count: 50 });
  }

}




// static navigationOptions = {
//   headerLeft: <Icon name="ios-home" style={{paddingLeft: 10}} />,
//   title: 'Grocerie`',
//   headerRight: <Icon style={{paddingRight: 10}} name="ios-home" />,
// };

const cartStyle = {
  label: 'AD',
  backgroundColor: colors.DARKYELLOW,
  labelColor: colors.ORANGE,
  ribbonLabel: 'New',
  ribbonStyle: { backgroundColor: colors.PURPLE_4 }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;

  const urlPrefix = '../assets/images/';

  if (routeName === 'Home') {
    iconName = require(urlPrefix + 'circles.png');
  } 
  else if (routeName === 'Categories' ) {
    iconName = require(urlPrefix + 'circles.png');
  }
  else if (routeName === 'Profile') {
    iconName = require(urlPrefix + 'circles.png');
  }
  else if (routeName === 'Cart') {
    iconName = require(urlPrefix + 'circles.png');
  }
  else if (routeName === 'Like') {
    iconName = require(urlPrefix + 'circles.png');
  }
 

  if (routeName === 'Cart') {
    return (
      <CartBubble
       tintColor = {tintColor}
       icon = {iconName}
      />  
    )
  }

  return <Image style={{width:30,height:30}} source={iconName} tintColor={tintColor} />;
};



const Dummy = function(){
return(
  <View/>
)
};

const screens = {
  Home: {
    screen: Dummy,
  },
  // Categories: () => <CategoryContainer/>,
  Categories: {
    screen : Dummy
  },
}

const BottomTabNavigator = createBottomTabNavigator(
  screens,
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarPosition: 'bottom',
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    lazy:false,
    tabBarOptions: styles.tabBarOptions,
  },
);


const NavigationStack1 = createStackNavigator(
  {
    MainScreen: {
      screen: BottomTabNavigator,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }

    // navigationOptions: ({ navigation }) => {
    //   return {
    //     HeaderTitle: () =>
    //       <ToolBar
    //         title='Grocerie'
    //       />
    //   }
    // }
  }
);




// const MainScreen1 = createAppContainer(MainScreen);

export default NavigationStack1;

// export default MainScreen1;
