import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
@observer
class Counter extends Component {
  render() {
    // console.log("Render Counter");
    return <View><Text>Count: {this.props.counterStore.count}</Text></View>;
  }
}

export default Counter;