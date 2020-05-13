import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from '../../styles/style';


export default class OTP extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // setTimeout(() => {
    //   console.log("login timeout");
    //   this.props.navigation.navigate('MainScreen');
    //   }, 3000);
  }

  render() {
    return (
      <View style={styles.parent}>
        <Text>OTP</Text>
      </View>
    );
  }
}
