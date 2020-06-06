import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Button, Colors, Typography} from 'react-native-ui-lib';
import { Easing } from 'react-native-reanimated';

class AnimationScreen extends Component {
  constructor(props) {
    super(props);
    this.translateXY = new Animated.ValueXY(0, 0);    
  }

  moveXY = () => {
    console.log('moveXY');
    // this.translateXY.setValue({x:0,y:0});
    Animated.timing(this.translateXY, {
        toValue: {x: 100, y: 200},
        duration:1000,
        useNativeDrawer:true,
        easing:Easing.linear
      }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          label="Animate"
          labelStyle={{fontWeight: 'PopinsMed'}}
          style={{margin: 10, borderRadius: 8}}
          outline
          outlineColor="#30B650"
          ref={(element) => (this.button_1 = element)}
          onPress={() => {
            // console.log('press working');
            this.moveXY();
          }}
        />

        <Animated.View style={this.translateXY.getLayout()}>
                <View style={styles.circle}/>
        </Animated.View>
      </View>
    );
  }
}
export default AnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderRadius: 25,
  },
});
