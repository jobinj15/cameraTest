import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles/style';
import global from '../../utility/global'
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext";
import constants from '../../utility/constants'
import user_repository from '../../repos/user_repository'
import { StackActions, NavigationActions } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import colors from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const fields = {
  USER_NAME: 'username',
  PASSWORD: 'password',
}

const errors = {
  [fields.USER_NAME]: {
    error: constants.ERROR_USERID
  },
  [fields.PASSWORD]: {
    error: constants.ERROR_PASSWORD,
  }
}



export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = this.mapKeysToState();
  }

  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

  mapKeysToState() {
    var objToSet = {};

    for (item in fields) {
      objToSet[fields[item]] = ''
    }

    objToSet.loading = false;

    console.log('mapKeysToState: ' + JSON.stringify(objToSet))
    return objToSet
  }

  componentDidMount() {
    // this.doRegister();
  }

  validateAndGetData() {
    var item;

    for (key in errors) {
      console.log('validateAndGetData ' + item)
      item = errors[key];

      if (!item.skipBlankCheck && !this.state[key])
        return global.showMessage(item.error)

      if (item.additional && !item.additional(this.state[key]))
        return false;
    }

    var key;
    // for (item in fields) {
    //   key = fields[item];
    //   dataToReturn[key] = this.state[key]
    // }

    let formdata = new FormData();
    for (let item in fields) {
      key = fields[item];
      formdata.append(key, this.state[key]);
    }

    return formdata;
  }

  handleLogin() {

    var data = this.validateAndGetData();

    if (!data)
      return;

    this.doLogin(data)

    console.log('handleRegister ' + JSON.stringify(data))

  }


  doLogin(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showMessage(constants.NO_INTERNET)
      else {

        this.setState({ loading: true }, () => {

          user_repository.doLogin(
            data,
            this.onLogIn.bind(this)
          );

        })

      }
    });

  }

  onLogIn(isError, responseData) {

    console.log('onRegistered ' + JSON.stringify(responseData))

    this.setState({ loading: false }, () => {
      if (!isError) {
        global.storeItem(constants.USER, responseData)
        global.showMessage("Login successful!")
        this._interval = setTimeout(() => {

          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({
              routeName: 'Home', params: {
                navigator: this.props.navigation
              }
            })]
          });

          this.props.navigation.dispatch(resetAction);
        }, 1000);
      } else {
        global.showMessage(responseData.message);
      }
    })

  }

  navigateTo(screen) {
    this.props.navigation.navigate(screen, {
      [constants.PARAM_NAV]: this.props.navigation,
    });
  }

  render() {

    return (
      <View
        style={[
          styles.styleFull, {
            padding: 15
          }
        ]}
      >

        {global.getIosToolbar(this.props.navigation)}

        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            paddingHorizontal: 15, flex: 1
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ flex: 1 }}
          >

            <Text
              style={[styles.bigBoldOnBoard, { marginHorizontal: 15, marginBottom: 15 }]}
            >

              {constants.TXT_LOGIN_TO}

            </Text>

            <FloatingTitleTextInputField
              attrName={fields.USER_NAME}
              title={constants.TXT_USERNAME}
              value={this.state[fields.USER_NAME]}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
              updateMasterState={this._updateMasterState}

              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 45,
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.PASSWORD}
              title={constants.TXT_PASSWORD}
              value={this.state[fields.PASSWORD]}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 40,
                secureTextEntry: true
              }}
            />

          </View>


          <TouchableWithoutFeedback
            onPress={
              () => {
                this.navigateTo('Forgot')
              }
            }
          >
            <View
              style={{
                marginTop: 10,
                flex: 1,
                alignItems: 'flex-end'
              }}
            >
              <Text
                style={[styles.stripLabel, { color: colors.PRIMARY, fontFamily: global.FONT_FAMILY.PopinsReg }]}
              >
                {constants.TXT_FORGOT_PASS}
              </Text>

            </View>
          </TouchableWithoutFeedback>

          <Ripple
            style={[styles.largeButton, { paddingHorizontal: 40, marginTop: 20}]}
            rippleColor={colors.RIPPLE}
            onPress={() => {
              this.handleLogin();
            }}
          >
              <Text
                style={styles.buttonText}
              >
                {global.capitalize(constants.TXT_LOGIN)}{" "}
              </Text>
          </Ripple>


          <View
            style={{ marginTop: hp('33%'), flexDirection: 'row', justifyContent: 'center' }}
          >

            <Text
              style={[styles.stripLabel, { fontFamily: global.FONT_FAMILY.PopinsReg, flex: undefined }]}
            >
              {constants.TXT_DONT_ACCOUNT}
            </Text>

            <TouchableWithoutFeedback
              onPress={
                () => {
                  this.navigateTo('Signup')
                }
              }
            >
              <Text
                style={[styles.stripLabel, { color: colors.PRIMARY, flex: undefined, fontFamily: global.FONT_FAMILY.PopinsReg }]}
              >
                {constants.TXT_SIGNUP}
              </Text>

            </TouchableWithoutFeedback>


          </View>



        </ScrollView>


        {
          this.state.loading &&
          global.getLoader()
        }


      </View>
    )

  }


}


// textInput: {
//   fontSize: 16,
//   textAlignVertical: 'top',
//   paddingVertical: 18,
//   paddingHorizontal:8,
//   borderRadius:18,
//   color:colors.BLACK,
//   backgroundColor:colors.WHITE,
//   paddingBottom: 2,
//   marginTop: 10,
// }