import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import {
  Assets,
  Constants,
  Button,
  Colors,
  Typography,
} from 'react-native-ui-lib'; //eslint-disable-line
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import styles from '../../styles/style';
import Banner from './banner'
import LabelStrip from './labelStrip'
import Categories from './categories'
import Recommendations from './recommendations'
import constants from '../../utility/constants';
import colors from '../../styles/colors';

const TAG = 'HomeTab'

// @inject("homeStore")
export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    console.log(TAG + ' NAV: ' + this.props.navigation)
  }
  render() {
    return (
      <View style={[styles.styleFull, { paddingTop: 10, backgroundColor: colors.WHITE }]}>

        <ScrollView>
          <View>
            <Banner
              navigation={this.props.navigation}
            />

            <LabelStrip
              style={{
                marginTop: 20
              }}
              label={constants.TXT_CATEGORIES}
            />

            <Categories
              style={{
                marginTop: 20
              }}
            />

            <LabelStrip
              style={{
                marginTop: 20
              }}
              label={constants.TXT_SEARCH_BYBRAND}
            />

            <Recommendations
              style={{
                marginTop: 20
              }}
            />

          </View>

        </ScrollView>

        

      </View>
    );
  }
}


