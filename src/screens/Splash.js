import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  ImageBackground,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import themeStore from '../screens/stores/ThemeStore';
import global from '../utility/global';
import SplashScreen from 'react-native-splash-screen';
import constants from '../utility/constants';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class SplashTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animX: new Animated.Value(Math.ceil(global.DEVICE_WIDTH)),
    };
  }

  animateText() {
    Animated.timing(this.state.animX, {
      toValue: 80,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // this.state.animY.setValue(0);
      //If you remove above line then it will stop the animation at toValue point
      this.navigateTo();
    });
  }

  componentDidMount() {
    console.log('Dev_Width: ' + Math.ceil(global.DEVICE_WIDTH));
    this.animateText();
    this.setTheme();
  }

  setTheme() {
    global.getItem(constants.PREFS).then((prefs) => {
      //    const themes = getAllThemes();

      if (prefs && prefs.theme) themeStore.theme = prefs.theme;
      else {
        themeStore.theme = 0;
        global.storeItem(constants.PREFS, {theme: 0});
      }

      console.log('setTheme ' + themeStore.theme);
    });
  }

  navigateTo() {
    global.getItem(constants.USER).then((result) => {
      var route;

      if (result) {
        route = 'Home';
        // route = 'LoginDemo';
      } else {
        route = 'OnBoard';
      }

      // route = 'OnBoard'

      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: route,
            params: {
              navigator: this.props.navigation,
            },
          }),
        ],
      });

      this.props.navigation.dispatch(resetAction);
      setTimeout(()=>{
        SplashScreen.hide();
      },1000)
    });
  }

  viewForAndroid() {
    return (
      <ImageBackground
        style={{
          flex: 1,
        }}
        source={{uri: 'start_screen'}}>
        {/* 
                <Animated.Text
                    style={[styles.VBigText, transformStyle, { marginTop: 160 }]}
                >
                    {"Animated Text"}
                </Animated.Text> */}
      </ImageBackground>
    );
  }

  viewForiOS() {
    let image = require('../assets/images/nature.jpg');

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={image}
          resizeMode='contain'
          style={{alignSelf: 'center', width: (deviceWidth * 65) / 100,marginBottom:30,marginRight:10}}
        />
      </View>
    );
  }

  render() {
    const transformStyle = {
      transform: [
        {
          translateX: this.state.animX,
        },
      ],
    };
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        {Platform.OS == 'android' ? this.viewForAndroid() : this.viewForiOS()}
      </View>
    );
  }
}
