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
import constants from '../../utility/constants';
import Recommendations from './recommendations'
import SearchByBrands from './searchByBrands'
import colors from '../../styles/colors';
import global from '../../utility/global';

const TAG = 'HomeTab'

// @inject("homeStore")
export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    console.log(TAG + ' NAV: ' + this.props.navigation)


  }

  navigateTo(){
    this.props.navigation.navigate('Products', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
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
              navigation={this.props.navigation}
            />

            {/* <Image
              style={{
                height: 70,
                width:global.DEVICE_WIDTH-30,
                backgroundColor:'red',
                alignSelf:'center',
                marginTop: 20
              }}
              source={require('../../assets/images/pic1.jpg')}
            />

            <LabelStrip
              style={{
                marginTop: 20
              }}
              label={constants.TXT_SEARCH_BYBRAND}
            />

            <SearchByBrands
              style={{
                marginTop: 20
              }}
            />

            <LabelStrip
              style={{
                marginTop: 20
              }}
              label={constants.TXT_RECOMMENDATION}
            />
 */}

          </View>

        </ScrollView>



      </View>
    );
  }
}


