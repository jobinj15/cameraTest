import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {Bubbles} from 'react-native-loader';
import {View as AnimatableView} from 'react-native-animatable';

import {View, StyleSheet,Text} from 'react-native';
import colors from '../styles/colors';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
  };

  static defaultProps = {
    color: colors.PRIMARY,
    size: 10,
  };

  render() {
    console.log('Loader color: ' + JSON.stringify(this.props));

    return (
      <View>
        <Text> Loading..... </Text>
      </View>
    );
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
    height: 80,
  },
});
