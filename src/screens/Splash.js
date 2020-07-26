import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  ImageBackground,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import colors from '../styles/colors/default';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default class SplashTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.navigateTo()
  }


  navigateTo() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'Camera',
          params: {
            navigator: this.props.navigation,
          },
        }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
    
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

  }

  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.WHITE,padding:20,alignItems:'center',
      justifyContent:'center'
      }}>
        
        <Icon name="camera" size={150} color={colors.BLACK} />
         
      </View>
    );
  }
}
