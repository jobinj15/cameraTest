/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  StyleSheet
} from 'react-native';

import { Provider } from "mobx-react";
import stores from "./src/screens/stores";
import ScreenContainer from './src/screens/ScreenContainer'
import RootContainer from './src/screens/rootContainer'
import SplashScreen from 'react-native-splash-screen';
import 'mobx-react/batchingForReactNative'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // x: 100,
      // y: 70,
      // moveXY: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // SplashScreen.hide()
  }

  // onPress = () => {
  //   console.log('test');
  //   this.setState({
  //     x: this.state.x1,
  //     y: this.state.y1,
      
  //   });
  //   profileImageHeight = this.state.moveXY.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0.5, 2],
  //   extrapolate: 'clamp'
  //   });
  //   this.setState({profileImageHeight:profileImageHeight});
  // };
  
  // onLayout = (e) => {
  //   this.setState({
  //     width: e.nativeEvent.layout.width,
  //     height: e.nativeEvent.layout.height,
  //     x1: e.nativeEvent.layout.x,
  //     y1: e.nativeEvent.layout.y
  //   })
  // }

  render() {
    return (
      <Provider {...stores}>
      <RootContainer />
      </Provider>

    );
  }

}
export default App;
