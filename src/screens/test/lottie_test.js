import React, {Component} from 'react';
import {View, StyleSheet, Animated,Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  Text,
  Assets,
  Constants,
  Button,
  Colors,
  Typography,
} from 'react-native-ui-lib';

class LottieExample extends Component {
  constructor() {
    super();
    this.state = {
      animationValue: new Animated.Value(0),
      
    };
    this.titleTranslateYValue = new Animated.Value(0);
    this.titleScaleValue = new Animated.Value(0);
    this.animatedValue = new Animated.Value(0);

  }

  startAnimation=()=>{

    



    // Animated.timing(this.state.animationValue, {
    //   toValue : 2,
    //   timing : 600,
    //   useNativeDriver: true,
    // }).start(()=>{
    // //   Animated.timing(this.state.animationValue,{
    // //     toValue : 0,
    // //     duration : 600,
    // //     useNativeDriver: true,    
    // //   }).start();
    // })
  }

  

  moveToXY = () => {
    console.log('moveToXY called');
  };


  componentDidMount(){

    console.log("componentDidUpdate called");
    this.titleTranslateYValue.setValue(0);
    this.titleScaleValue.setValue(0);

    
    Animated.sequence([
        Animated.timing(this.titleTranslateYValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDrawer:true
        }),
        Animated.timing(this.titleScaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.linear
        })
      ]).start();


  }
  render() {

    const startX = 50;
    const startY = 10;
    const endX =200;
    const endY =50;

    const initialScale = 0;

    const titleMoveY = this.titleTranslateYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
      });
  
      const titleMoveX = this.titleTranslateYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
      });

      const titleScale = this.titleScaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.25, 0.5, 1]
      });
  
      const titleTransformStyle = {
        transform: [{ translateY: titleMoveY },{ translateX: titleMoveX }, { scale: titleScale }]
      };



      const width = 100;
      const height = 20;
      const scale = {
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [initialScale, 1]
            })
          }
        ]
      };
      
      const position= {
        transform: [
          {
            translateX: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [startX - (width / 2) - (width * initialScale / 2), endX]
            })
          },
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [startY - (height / 2) - (height * initialScale / 2), endY]
            })
          }
        ]
      };

    

    return (
      <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
        {/*  <LottieView source={require('../../assets/animations/dumble.json')} autoPlay loop /> */}


                <Animated.View style={[styles.titleContainer, titleTransformStyle]}>
            <Text style={styles.title}>Title</Text>




          </Animated.View>
        {/* <Animated.View style={[styles.animatedBox,animatedStyle]} /> */}

        <Animated.View style={position}>
        <Animated.View style={[styles.thing, scale]} />
    </Animated.View>


      </View>
    );
  }
}
export default LottieExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thing:{
      backgroundColor:'red',
      height:100,
      width:100,

  },
  animatedBox: {
    width: 180,
    height: 180,
    backgroundColor: '#FF6F00',
  },
  titleContainer: {
    position: "absolute",
    top: -100
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
});
