
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Bubbles} from 'react-native-loader';

import {
  View,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';


export default class Loading extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
  }

  static defaultProps = {
    color: colors.PRIMARY,
    size: 10
  }



  render() {

    console.log('Loader color: ' + JSON.stringify(this.props))

    return (
      <Bubbles size={this.props.size} color={this.props.color} />

    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
});
