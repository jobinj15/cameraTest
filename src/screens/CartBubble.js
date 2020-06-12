import React, {Component} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {observer, inject} from 'mobx-react';
import global from '../utility/global';
import styles from '../styles/style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

@inject('cartStore')
@observer
export default class CartBubble extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });


  }

  flip_Animation = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver:true
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 360,
        tension: 10,
        friction: 8,
        useNativeDriver:true,
      }).start();
    }
  };

  getBubble(store,Rotate_Y_AnimatedStyle) {
    if (store.noOfItems)
      return (
        <Animated.View
          style={[
            global.getCircleViewStyle(18),Rotate_Y_AnimatedStyle,
            {
              backgroundColor: 'red',
              top: 2,
              right: wp('5%'),
              position: 'absolute',
            },
          ]}>
          <Text style={styles.labelMini}>{store.noOfItems}</Text>
        </Animated.View>
      );

    return <View />;
  }

  render() {
    const store = this.props.cartStore;

    this.SetInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['360deg', '0deg'],
    });

    const Rotate_Y_AnimatedStyle = {
    transform: [{ rotateY: this.SetInterpolate }],
    };



    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Icon name={this.props.icon} size={25} color={this.props.tintColor} /> */}
        <Image
          style={{width: 30, height: 30}}
          source={this.props.icon}
          tintColor={this.props.tintColor}
        />
        {this.getBubble(store,Rotate_Y_AnimatedStyle)}
      </View>
    );
  }

  componentDidMount() {
    console.log('componentDid CartBubble called');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate CartBubble called');
    this.flip_Animation();
    // this.flip_Animation();
  }
}
