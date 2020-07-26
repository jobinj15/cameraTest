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
  StyleSheet,
  SafeAreaView
} from 'react-native';

import RootContainer from './src/screens/rootContainer'
// import SplashScreen from 'react-native-splash-screen';

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
            <SafeAreaView style={stylesLocal.container}>

            <RootContainer />
            </SafeAreaView>

    );
  }

}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
