import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import HomeContainer from './home/homeContainer';
import ProfileContainer from './profile/profileContainer';
import ColorsTab from './home/colorsTab';
import BodyChart from './test/bodychart';
import LottieExample from './test/lottie_test';
import Counter from './home/Counter';
import Cart from './cart/cart';
import { createStackNavigator, Header, HeaderTitle } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { Avatar, AvatarHelper, Typography } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import ToolBar from '../components/toolbar';
import global from '../utility/global';

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


  if (routeName === 'Cart') {
    // return (
    //   <Avatar
    //     {...cartStyle}
    //   />
    // )
    return (
      <View
        style={{
          width: '100%', height: '100%',
          alignItems:'center',justifyContent:'center'
        }}
      >
        <IconComponent name={iconName} size={25} color={tintColor} />
        <View
          style={[global.getCircleViewStyle(15),
          { backgroundColor: 'red', top: 7, right: 35, position: 'absolute' }]}
        >
        </View>
      </View>
    )
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const screens = {
  Home: {
    screen: HomeContainer,
  },
  Cart: Cart,
  Profile: ProfileContainer,
  Search: ColorsTab,
}

const BottomTabNavigator = createBottomTabNavigator(
  screens,
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarPosition: 'bottom',
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),

    tabBarOptions: {
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: 'gray',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: colors.WHITE,
        height: 48
      }
    },
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
