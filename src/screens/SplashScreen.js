import React, {Component} from 'react';
import {View,StyleSheet, Image} from 'react-native';
import styles from '../styles/style';
// import { Block, Button, Card, Icon, Input, NavBar, Text } from 'galio-framework';
import {
  Text,
  Assets,
  Constants,
  Button,
  Colors,
  Typography,
} from 'react-native-ui-lib'; //eslint-disable-line

export default class Splashscreen extends Component {

   
    
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.parent}>
        <Text>Splashscreen</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Button
            backgroundColor="#30B650"
            label="Sign Up"
            labelStyle={{fontWeight: '600'}}
            style={{margin: 10,borderRadius:8}}
            enableShadow
            ref={(element) => (this.button_1 = element)}
            onPress={() => {
                this.props.navigation.navigate('Signup', {
                    itemId: 86,
                    otherParam: 'anything you want here',
                  });
            }}
          />

          <Button
            
            label="Sign In"
            labelStyle={{fontWeight: '600'}}
            style={{margin: 10,borderRadius:8}}
            outline
            outlineColor="#30B650"
            ref={(element) => (this.button_1 = element)}
            onPress={() => {
                this.props.navigation.navigate('Signin', {
                    itemId: 86,
                    otherParam: 'anything you want here',
                  });
            }                
            }
          />
        </View>
      </View>
    );
  }
}
