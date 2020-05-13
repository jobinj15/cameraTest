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

@inject(stores => ({
  counterStore: stores.counterStore,
  colorsStore: stores.colorsStore,
  }))
@observer
export default class ColorsTab extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={[styles.parent,{backgroundColor:this.props.colorsStore.color}]}>
        <Text
        style={
          styles.bigBold
        }
        >{"Count: " + this.props.counterStore.count}
        
        </Text>        
        <Button
            backgroundColor="#30B650"
            label={this.props.colorsStore.colorName}
            labelStyle={{fontWeight: '600'}}
            style={{margin: 10,borderRadius:8}}
            enableShadow
            ref={(element) => (this.button_1 = element)}
            onPress={() => {
              this.props.colorsStore.changeColor();
            }}
          />
          
      </View>
    );
  }
}


