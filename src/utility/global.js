import React, { Component } from 'react';
import {
  Dimensions,
  PixelRatio,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Snackbar from 'react-native-snackbar'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
var dateFormat = require('dateformat');
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import constants from './constants';
import { View } from 'react-native-ui-lib';
import Loader from '../utility/loader';
import styles from '../styles/style'
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

//We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;
function em(value) {
  return unit * value;
}
const database_name = "Test.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

const STATUS_INSERT = 1;
const STATUS_UPDATE = 2;
const STATUS_DELETE = 3;

// const password = 'af080b3ab6f34f5f8082336951db67bc'; // Shared Secret from iTunes connect
const password = 'f06b313711a84e58af0266c709291f83'; // Shared Secret from iTunes connect Ameya


function normalize(value) {

  console.log('normalize called');
  if (PixelRatio.get() === 2) {
    console.log(" 4s,5s, till 6s ,7,8");
    return value;
  } else if (PixelRatio.get() === 3) {
    console.log(" 6splus,7plus,8plus,x ");
    return (value + 2);
  } else {
    console.log(" ipad ");
    return (value + 3);
  }

}

function normalizeHeight(value) {

  console.log('normalizeHeight called');
  if (PixelRatio.get() === 2) {
    console.log(" 4s,5s, till 6s ,7,8");
    return (value + 30);
  } else if (PixelRatio.get() === 3) {
    console.log(" 6splus,7plus,8plus,x ");
    return (value + 50);
  } else {
    console.log(" ipad ");
    return (value + 200);
  }

}

export default global = {

  MAPHEIGHT: normalizeHeight(200),
  BANNERHEIGHT: normalizeHeight(160),
  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,
  IMAGE: {
    THUMBNAIL_PLACEHOLDER: require('../assets/images/placeholder.jpeg')
  },

  CONSTANTS: {
    ID: 'id',
    USER_ID: 'user_id',
    RATING: 'rating',
    REVIEW: 'review',
    FONT_FAMILY: 'MuseoSans-500',
    SUBSCRIPTION_EXPIRED: 'Subscription Expired Please Purchase to continue cloud sync ',
    STATUS_INSERT: STATUS_INSERT,
    STATUS_UPDATE: STATUS_UPDATE,
    STATUS_DELETE: STATUS_DELETE,
    RADIUS: 500,
    RADIUS_STRING: '500',
  },
  TEXT: {
    PLACEHOLDER_SEARCH: 'stores, malls, markets, products',
  },
  COLOR: {
    ORANGE: '#C50',
    DARKBLUE: '#0F3274',
    LIGHTBLUE: '#6EA8DA',
    DARKGRAY: '#999',
    SELECTOR: '#163a48',
    DARKYELLOW: '#f7c935',
    WHITE: '#fff',
    ListViewBG: '#dbdbdb',
    COLOR_PRIMARY: '#c11744',
    DARKDEEPGRAY: '#313131',
    TRANSPARENT: 'transparent',
    LIGHTBLUEODD: '#206880',
    BLACK: '#000',
    LIGHT_GRAY: 'lightgrey',
    LIGHT_GRAY_TEXT: '#b4b4b4',
    ACCENT_COLOR: '#e6e7e9',
    HIGHLIGHT_COLOR: '#dddddd',
    BLUE_4: '#085871',
    PINK_4: '#b5375d',
    PURPLE_4: '#604065',
    PURPLE_TINT: '#eee8f3',
    GREEN_4: '#1CC98B',

    DEFAULT_SELECTOR: '#dddddd',

    MALL_PRIMARY: '#604065',
    MALL_HIGHLIGHTS: '#432f43',
    MALL_LIGHT: '#705274',

    EXHIBITION_PRIMARY: '#536404',
    EXHIBITION_LIGHT: '#54643f',

    STORE_PRIMARY: '#085871',

  },
  FONT: {
    _10: normalize(10),
    _11: normalize(11),
    _12: normalize(12),
    _13: normalize(13),
    _14: normalize(14),
    _15: normalize(15),
    _16: normalize(16),
    _17: normalize(17),
    _18: normalize(18),
    _19: normalize(19),
    _20: normalize(20),
    FONT_SIZE: em(1),
    FONT_SIZE_SMALLER: em(0.75),
    FONT_SIZE_SMALL: em(0.875),
    FONT_SIZE_TITLE: em(1.25),
  },
  FONT1: {
    _10: responsiveFontSize(0.6),
    _11: responsiveFontSize(0.7),
    _12: responsiveFontSize(0.8),
    _13: responsiveFontSize(1),
    _14: responsiveFontSize(1.8),
    _15: responsiveFontSize(1.9),
    _16: responsiveFontSize(2),
    _17: responsiveFontSize(2.1),
    _18: responsiveFontSize(2.5),
    _19: responsiveFontSize(2.8),
    _20: responsiveFontSize(3),
    FONT_SIZE: em(1),
    FONT_SIZE_SMALLER: em(0.75),
    FONT_SIZE_SMALL: em(0.875),
    FONT_SIZE_TITLE: em(1.25),
  },
  PADDING: {
    _EM1: em(1),
    _EM075: em(0.75),
    _EM_0875: em(0.875),
    _EM_125: em(1.25),

  },
  DEVICE_DIMENSION: {
    DEVICE_WIDTH: Dimensions.get('window').width,
    DEVICE_HEIGHT: Dimensions.get('window').height,
  },



  getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key).then(
        keyValue => {
          // console.log("Key value: " + keyValue); //Display key value
          const item = JSON.parse(keyValue);
          resolve(item);
        },
        error => {
          resolve(false);
          console.log("isLoggedIn error :: " + JSON.stringify(error)); //Display error
        }
      );
    });
  },

  isValidPin(text) {
    if (!text) {
      Snackbar.show({
        text: constants.ERROR_PIN,
        duration: Snackbar.LENGTH_SHORT,
      })
      return false;
    }


    if (text.trim().length != 6) {
      Snackbar.show({
        text: constants.ERROR_PIN,
        duration: Snackbar.LENGTH_SHORT,
      })
      return false;
    }


    return true;
  },

  toNumbers(text) {
    return (text.replace(/[^0-9]/g, ''))
  },

  showAlert(title, description, onOkay, onCancel, txtYes = "Yes", txtNo = "No", cancelable = true) {

    console.log('showAlert called!')

    Alert.alert(
      title,
      description,
      [
        {
          text: txtYes,
          onPress: () => {
            console.log('showAlert onOkay!')
            if (onOkay) onOkay()
          }
        },
        {
          text: txtNo,
          onPress: () => {
            if (onCancel) onCancel()
          },
          style: 'cancel'
        },
        // { text:  , onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: cancelable }
    );
  },

  async storeItem(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  },

  sendAsFormData(data) {
    let formdata = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }

    return formdata;
  },

  getSeperator(morestyles = {}) {
    return (
      <View
        style={[{ height: 0.5, backgroundColor: colors.LIGHT_GRAY_TEXT, flex: 1 }, morestyles]}
      />
    )
  },

  getNoDataView(message, from) {
    return (
      <View
        style={[styles.loaderCenter]}
      >

        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            style={{
              height: from ? 160 : 30, width: from ? 160 : 30, tintcolor: colors.PRIMARY,
              marginRight: 10, marginBottom: from ? 20 : 10,marginTop:-20
            }}
            source={getIcon(from)}
          />

          <Text
            style={[styles.bigBold, {
              color: colors.DARKGRAY, textAlign: 'center',
            }]}
          >
            {message ? message : constants.TXT_NO_DATA}

          </Text>

        </View>


      </View>
    )
  },

  bottomBlockView(morestyles = {}) {
    return (
      <View
        style={[styles.bottomView, { height: 45, backgroundColor: "rgba(255,255,255,0.6)" }, morestyles]}
      />
    )
  },

  getIosToolbar(navigator, color = colors.BLACK, size = 25, addStyles = {}) {
    return (
      <View
        style={styles.toolbarIos}
      >
        <TouchableOpacity
          onPress={() => {
            if (navigator)
              navigator.pop();
          }}
        >
          <View
            style={[{ padding: 8 }, addStyles]}
          >
            <Icon name="arrow-back" size={size} color={color} />


          </View>
        </TouchableOpacity>
      </View>
    )
  },


  getLoader() {
    return (
      <View
        style={[styles.loaderCenter]}
      >
        <Loader />

      </View>
    )
  },

  isValidEmail(text) {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = reg.test(text);
    if (!isValid) {
      Snackbar.show({
        text: constants.ERROR_EMAILV,
        duration: Snackbar.LENGTH_SHORT,
      })
      return false;
    }
    return true;
  },

  getEncodedHeader() {
    return {
      'Content-Type': 'multipart/form-data',
      'utoken': 'ecom_app'
    }
  },

  // getViewAll(addStyles = {}) {

  //   return (
  //     <View flex right>
  //       <Text
  //         style={[styles.viewAll]}
  //       >
  //         {constants.TXT_VIEWALL}
  //       </Text>
  //     </View>

  //   )

  // },

  getCircleViewStyle(size, addStyle = {}) {

    var circleStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: "hidden",
      alignItems: 'center',
      justifyContent: "center"
    }

    return { ...circleStyle, ...addStyle }

  },

  isValidMobNo(number) {
    if (!number || number.length < 10) {
      Snackbar.show({
        text: constants.ERROR_MOBILE,
        duration: Snackbar.LENGTH_SHORT,
      })
      return false
    }
    return true;
  },

  backHome(navgation) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({
        routeName: 'Home', params: {
          // navigator: this.props.navigation
        }
      })]
    });

    navgation.dispatch(resetAction);

  },

  capitalize(text) {

    if (!text || !text.length)
      return;

    return text.toUpperCase();
  },

  showMessage(message) {
    // dismissKeyboard();
    if (message) {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT, // optional
        // Can be .LENGTH_INDEFINITE | .LENGTH_LONG | LENGTH_SHORT
      })
    }
  },

  // get showMessage(){
  //   return this.showMessage
  // },

  isANumber(str) {
    return !/\D/.test(str);
  },
  isOnline() {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        resolve(state.isConnected);
      });

    });

  },

  getExceptionMessage() {
    var errorResponse = {
      message: "something went Wrong"
    };

    return errorResponse;
  },

  getCurrentDate() {
    console.log('getCurrentDate called');
    var today = new Date();
    var currentDate = dateFormat(today, 'dd-mmm-yyyy');
    return currentDate;
  },


  getRelativeTime1(current, lastSync) {
    console.log('getRelativeTime');
    console.log('current :: ' + current);
    console.log('lastSync :: ' + lastSync);

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 7;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date(current) - new Date(lastSync);

    console.log('elapsed :: ' + elapsed);
    console.log('msPerWeek :: ' + msPerWeek);

    if (elapsed < msPerMinute) {
      return Math.round(1000);
    }

    else if (elapsed < msPerHour) {
      return Math.round(msPerMinute);
    }

    else if (elapsed < msPerDay) {
      return Math.round(msPerHour);
    }

    else if (elapsed < msPerWeek) {
      return Math.round(msPerDay);
    }

    else if (elapsed < msPerMonth) {
      return Math.round(msPerDay);
    }

    else if (elapsed < msPerYear) {
      return Math.round(msPerMonth);
    }
    else {
      return Math.round(msPerYear);
    }

  },
  getRelativeTime(current, lastSync) {

    console.log('getRelativeTime');
    console.log('current :: ' + current);
    console.log('lastSync :: ' + lastSync);

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 6;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date(current) - new Date(lastSync);

    console.log('elapsed :: ' + elapsed);
    console.log('msPerWeek :: ' + msPerWeek);

    if (elapsed < msPerMinute) {
      return (Math.round(elapsed / 1000) < 20) ? 'just now ' : '  few seconds ago';
    }

    else if (elapsed < msPerHour) {
      var finalDuration = Math.round(elapsed / msPerMinute);
      return finalDuration == 1 ? finalDuration + ' minute ago' : finalDuration + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      var finalDuration = Math.round(elapsed / msPerHour);
      return finalDuration == 1 ? finalDuration + ' hour ago' : finalDuration + ' hours ago';
    }

    //
    else if (elapsed < msPerWeek) {
      var finalDuration = Math.round(elapsed / msPerDay);
      return finalDuration == 1 ? finalDuration + ' day ago' : finalDuration + ' days ago';
    }

    else if (elapsed < msPerMonth) {
      var finalDuration = Math.round(elapsed / msPerWeek);
      return finalDuration == 1 ? finalDuration + ' week ago' : finalDuration + ' weeks ago';
    }

    else if (elapsed < msPerYear) {
      var finalDuration = Math.round(elapsed / msPerMonth)
      return finalDuration == 1 ? finalDuration + ' month ago' : finalDuration + ' months ago';
    }

    else {
      var finalDuration = Math.round(elapsed / msPerYear);
      return finalDuration == 1 ? finalDuration + ' year ago' : finalDuration + ' years ago';
    }

  },

};

function getIcon(from) {

  switch (from) {

    case constants.NO_INTERNET_REF:
      return require('../assets/images/no_data.jpg');

    case constants.FRM_PRODUCTS:
      return require('../assets/images/empty_products.png');

    case constants.FRM_ORDERS:
      return require('../assets/images/empty_orders.png');

    case constants.FRM_ADDRESS:
      return require('../assets/images/empty_address.png');

    case constants.FRM_CART:
      return require('../assets/images/empty_cart.png');


    default:
      return require('../assets/images/no_data.jpg')

  }
}
