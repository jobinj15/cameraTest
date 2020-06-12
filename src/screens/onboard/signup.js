import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles/style';
import global from '../../utility/global'
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext";
import constants from '../../utility/constants'
import user_repository from '../../repos/user_repository'
import Ripple from 'react-native-material-ripple';
import colors from '../../styles/colors/default';

const fields = {
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  EMAIL_ID: 'email_id',
  PASSWORD: 'password',
  MOBILE: 'mobile_no',
  GENDER: 'gender',
}

const errors = {
  [fields.FIRST_NAME]: {
    error: constants.ERROR_FIRST_NAME
  },
  [fields.LAST_NAME]: {
    error: constants.ERROR_LAST_NAME,
  },
  [fields.EMAIL_ID]: {
    error: constants.ERROR_EMAIL,
    additional: global.isValidEmail
  },
  [fields.MOBILE]: {
    error: constants.ERROR_MOBILE,
    additional: global.isValidMobNo
  },
  [fields.GENDER]: {
    error: constants.ERROR_GENDER,
  },
  [fields.PASSWORD]: {
    error: constants.ERROR_PASSWORD,
  }
}



export default class Signup extends Component {

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
    objToSet[fields.MOBILE] = '';
    objToSet[fields.GENDER] = constants.MALE

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

  handleRegister() {

    var data = this.validateAndGetData();

    if (!data)
      return;

    this.doRegister(data)

    console.log('handleRegister ' + JSON.stringify(data))

  }


  doRegister(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showMessage(constants.NO_INTERNET)
      else {

        this.setState({ loading: true }, () => {

          user_repository.registerUser(
            data,
            this.onRegistered.bind(this)
          );

        })

      }
    });

  }

  onRegistered(isError, responseData) {

    console.log('onRegistered ' + JSON.stringify(responseData))

    this.setState({ loading: false }, () => {
      if (!isError) {
        global.storeItem(constants.USER, responseData)
        global.showMessage("Registered successfully!")
        this._interval = setTimeout(() => {
          this.navigateTo();
        }, 1000);
      } else {
        global.showMessage(responseData.message);
      }
    })

  }

  navigateTo() {
    this.props.navigation.navigate('Home', {
      [constants.PARAM_NAV]: this.props.navigation,
    });
  }

  render() {

    return (
      <View
        style={[
          styles.styleFull, {
            padding: 15
          }]}
      >

        {global.getIosToolbar(this.props.navigation)}


        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            paddingHorizontal: 15,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View

          >

            <Text
              style={[styles.bigBoldOnBoard, { marginHorizontal: 15, marginBottom: 15 }]}
            >

              {constants.TXT_CREATE_ACCOUNT}

            </Text>


            <FloatingTitleTextInputField
              attrName={fields.FIRST_NAME}
              title={constants.TXT_FIRST_NAME}
              value={this.state[fields.FIRST_NAME]}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
              updateMasterState={this._updateMasterState}

              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 12,
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.LAST_NAME}
              title={constants.TXT_LAST_NAME}
              value={this.state[fields.LAST_NAME]}
              disabled={this.state.loading}
              style={{
                marginBottom: 15
              }}
              updateMasterState={this._updateMasterState}

              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 12,
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.EMAIL_ID}
              title={constants.TXT_EMAIL}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
              value={this.state[fields.EMAIL_ID]}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                keyboardType: "email-address",
              }}
            />

            <FloatingTitleTextInputField
              attrName={fields.MOBILE}
              title='Mobile Number'
              style={{
                marginBottom: 15,
              }}
              disabled={this.state.loading}
              value={this.state[fields.MOBILE]}
              onChange={mobNo => {
                this.setState({ [fields.MOBILE]: global.toNumbers(mobNo) })
              }}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                keyboardType: "numeric",
                maxLength: 10
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
                maxLength: 12,
                secureTextEntry: true
              }}
            />

          </View>

          <Ripple
            onPress={() => {
              this.handleRegister();
            }}
            style={[styles.largeButton, {
              marginLeft: 0, paddingHorizontal: 40, marginBottom: 60,
              marginTop: 20
            }]}
            rippleColor={colors.RIPPLE}
          >
              <Text
                style={styles.buttonText}
              >
                {global.capitalize(constants.TXT_REGISTER)}{" "}
              </Text>
          </Ripple>

        </ScrollView>

        {/* <View
          style={styles.bottomlayout}
        >

          
        </View> */}

        {
          this.state.loading &&
          global.getLoader()
        }


      </View>
    )

  }


}
