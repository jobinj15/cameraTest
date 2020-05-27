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
import ImpMessage from './ImpMessage'
import LabelStrip from './labelStrip'
import Categories from './categories'
import constants from '../../utility/constants';
import Recommendations from './recommendations'
import SearchByBrands from './searchByBrands'
import colors from '../../styles/colors';
import global from '../../utility/global';
import ToolBar from '../../components/toolbar';

const TAG = 'HomeTab'

var cartCountApiData={
  user_id : ''
}

 class HomeTab extends Component {
  
  constructor(props) {
    super(props);
    console.log(TAG + ' NAV: ' + this.props.navigation)
  }

  static navigationOptions = ({ navigation }) => {
    //return header with Custom View which will replace the original header 
    return {
      header: (
        <ToolBar
            title='Grocerie'
            showTitleH = {true}
            showBackButton={false}
          />
      ),
    };
  };


  navigateTo(){
    this.props.navigation.navigate('Products', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  } 

  componentDidMount(){
    global.getItem(constants.USER).then(result => {
      if (!result) return;

      this.setUserIdToApiData(result)

      this.callApi()
  });

  }

  setUserIdToApiData(result){
     cartCountApiData.user_id = result.user_id;
  }

  callApi(){
   this.props.cartStore.getCartCount(global.sendAsFormData(cartCountApiData))
  }


  render() {
    return (
      <View style={[styles.styleFull, { padding: 0, backgroundColor: colors.WHITE }]}>

        <ScrollView>
          <View>

            <ImpMessage/>            

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
export default inject('cartStore')(observer(HomeTab));


