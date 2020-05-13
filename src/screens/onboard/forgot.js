import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from '../../styles/style';


export default class Forgot extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.parent}>
        <Text>Forgot</Text>
      </View>
    );
  }
}
