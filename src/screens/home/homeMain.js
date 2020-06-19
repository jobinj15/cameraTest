import React, { Component } from 'react';
import { View, FlatList, ScrollView, Image } from 'react-native';
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

var cartCountApiData = {
  user_id: ''
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
          title={constants.APP_NAME}
          showTitleH={false}
          showDropdown={true}
          showEndButton={true}
          endIcon={'ios-search'}
          iconType={constants.IC_IONIC}
          showBackButton={false}
        />
      ),
    };
  };


  navigateTo() {
    this.props.navigation.navigate('Products', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  }

  componentDidMount() {
    global.getItem(constants.USER).then(result => {
      if (!result) return;

      this.setUserIdToApiData(result)

      this.callApi()
    });

  }

  setUserIdToApiData(result) {
    cartCountApiData.user_id = result.user_id;
  }

  callApi() {
    this.props.cartStore.getCartCount(global.sendAsFormData(cartCountApiData))
  }



  getHeaders() {
    return (
      <View>
        <ImpMessage />
        <Banner
          navigation={this.props.navigation}
        />
        <LabelStrip
          style={{
            marginTop: 40
          }}
          label={constants.TXT_CATEGORIES}
        />
        <Categories
          style={{
            marginTop: 5
          }}
          navigation={this.props.navigation}
        />

      </View>
    )
  }

  getFooters() {
    return (
      <View>
        <Image
          style={{
            height: 70,
            width: global.DEVICE_WIDTH - 30,
            alignSelf: 'center',
            marginTop: 25
          }}
          source={require('../../assets/images/pic1.jpg')}
        />

        
        <SearchByBrands
          style={{
            marginTop: 8,
          }}
        />

        <Recommendations
          style={{
            marginTop: 8
          }}
        />



      </View>
    )
  }



  render() {
    return (
      <View style={[styles.styleFull, { padding: 0, backgroundColor: colors.WHITE }]}>

        {/* <ScrollView>
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
            /> */}

        {/* <Categories
              style={{
                marginTop: 20
              }}
              navigation={this.props.navigation}
            /> */}

        {/* <Image
              style={{
                height: 70,
                width:global.DEVICE_WIDTH-30,
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
                marginVertical: 20
              }}
            />

            <LabelStrip
              style={{
                marginTop: 20
              }}
              label={constants.TXT_RECOMMENDATION}
            />


          </View>

        </ScrollView> */}

        <FlatList
          navigation={this.props.navigation}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          data={[]}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            this.getHeaders()
          }
          ListFooterComponent={
            this.getFooters()
          }
        />


      </View>
    );
  }
}
export default inject('cartStore')(observer(HomeTab));


