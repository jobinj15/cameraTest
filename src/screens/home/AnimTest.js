import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from '../../styles/style';
import Counter from './Counter';

import {
  Assets,
  Constants,
  Button,
  Colors,
  Typography,
} from 'react-native-ui-lib'; //eslint-disable-line


import { observable } from "mobx";
import { observer, inject } from "mobx-react";


@inject("counterStore")
export default class HomeTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.parent}>
        <Text>Home</Text>
        <Counter />
        <Counter />
        <Counter />
        <Button
            backgroundColor="#30B650"
            label="Add to cart"
            labelStyle={{fontWeight: '600'}}
            style={{margin: 10,borderRadius:8}}
            enableShadow
            ref={(element) => (this.button_1 = element)}
            onPress={() => {
              this.props.counterStore.increment();
            }}
          />
          
      </View>
    );
  }
}


