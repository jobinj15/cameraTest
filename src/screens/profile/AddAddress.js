import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Dropdown } from "react-native-material-dropdown";
import { observer, inject } from "mobx-react";
import styles from '../../styles/style';
import global from '../../utility/global'
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext";
import constants from '../../utility/constants'
import user_repository from '../../repos/user_repository'
import colors from '../../styles/colors';
import stores from '../stores';

var pinApiData = {
  pincode: ''
}

var listApiData = {
  page_no: 0,
  user_id: ''
}


const fields = {
  FULL_NAME: 'name',
  ADDRESS: 'address',
  MOBILE: 'number',
  LANDMARK: 'landmark',
  PINCODE: 'pin_code',
  AREA: 'area',
}

const errors = {
  [fields.FULL_NAME]: {
    error: constants.ERROR_FIRST_NAME
  },
  [fields.ADDRESS]: {
    error: constants.ERROR_ADDRESS,
  },
  [fields.MOBILE]: {
    error: constants.ERROR_MOBILE,
    additional: global.isValidMobNo
  },
  [fields.LANDMARK]: {
    skipBlankCheck: true,
  },
  [fields.PINCODE]: {
    error: constants.ERROR_PIN,
    additional: global.isValidPin
  },
  [fields.AREA]: {
    error: constants.ERROR_AREA,
  }
}

var store;

@inject(stores => ({
  addStore: stores.addAddressStore,
  listStore: stores.addressListStore,
}))

export default class AddAddress extends Component {

  constructor(props) {
    super(props);
    this.state = this.mapKeysToState();

    store = this.props.addStore
 
    const { navigation } = this.props
    this.state.userId = navigation.getParam(constants.PARAM_USER, null)
    afterAddressAdded = this.afterAddressAdded.bind(this)

  }

  afterAddressAdded() {
    listApiData.user_id = this.state.userId;
    this.props.listStore(global.sendAsFormData(listApiData), listApiData.page_no)
    this.props.navigation.pop()
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
    store.afterAddressAdded = this.afterAddressAdded
  }

  validateAndAddAddress() {
    var item;

    for (key in errors) {
      console.log('validateAndGetData ' + item)
      item = errors[key];

      if (!item.skipBlankCheck && !this.state[key])
        return global.showMessage(item.error)

      if (item.additional && !item.additional(this.state[key]))
        return false;
    }

    if (!store.isValidPin)
      return global.showMessage(constants.ERROR_PIN)

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

    formdata.append('state', store.state)
    formdata.append('city', store.city)
    formdata.append('user_id', this.state.userId)


    console.log("AllData : " + JSON.stringify(formdata))

    return formdata;
  }

  componentWillUnmount(){
    store.state = constants.TXT_STATE
    store.city = constants.TXT_CITY
  }

  handleAddAddress() {

    var data = this.validateAndAddAddress();

    if (!data)
      return;

    store.addAddress(data)

  }



  render() {

    return (
      <View
        style={[
          styles.styleFull, { backgrounColor: colors.WHITE }
        ]}
      >

        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            padding: 15, backgrounColor: colors.WHITE,
          }}

        >
          <View
          >
            <FloatingTitleTextInputField
              attrName={fields.FULL_NAME}
              title={constants.TXT_FULL_NAME}
              value={this.state[fields.FULL_NAME]}
              style={{
                marginBottom: 15
              }}
              disabled={store.loading}
              updateMasterState={this._updateMasterState}
              textInputStyles={{ // here you can add additional TextInput styles
                color: 'green',
                fontSize: 15,
              }}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 12,
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.ADDRESS}
              title={constants.TXT_ADDRESS}
              value={this.state[fields.ADDRESS]}
              disabled={store.loading}
              style={{
                marginBottom: 15,
              }}
              updateMasterState={this._updateMasterState}
              textInputStyles={{ // here you can add additional TextInput styles
                color: 'green',
                fontSize: 15,
                height: 40
              }}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                numberOfLines: 5
              }}
            />

            <FloatingTitleTextInputField
              attrName={fields.MOBILE}
              title='Mobile Number'
              style={{
                marginBottom: 15,
              }}
              disabled={store.loading}
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
              attrName={fields.LANDMARK}
              title={constants.TXT_LANDMARK}
              style={{
                marginBottom: 15
              }}
              disabled={store.loading}
              value={this.state[fields.LANDMARK]}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.PINCODE}
              title={constants.TXT_PIN}
              value={this.state[fields.PINCODE]}
              style={{
                marginBottom: 15
              }}
              onChange={pin => {
                this.setState({ [fields.PINCODE]: pin.replace(/[^0-9]/g, '') }, () => {
                  if (pin && pin.length > 5) {
                    store.isValidPin = false;
                    pinApiData.pincode = pin;
                    store.getPin(global.sendAsFormData(pinApiData))
                  }
                })
              }}
              disabled={store.loading}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                keyboardType: "numeric",
                maxLength: 6,
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.AREA}
              title={constants.TXT_AREA}
              style={{
                marginBottom: 15
              }}
              disabled={store.loading}
              value={this.state[fields.AREA]}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
              }}
            />

            <Text
              style={[styles.labelBorder, { marginBottom: 10 }]}
            >

              {store.state}

            </Text>

            <Text
              style={styles.labelBorder}
            >

              {store.city}

            </Text>


          </View>

        </ScrollView>

        <View
          style={[styles.bottomlayout, { bottom: 10, marginBottom: 10 }]}
        >

        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            this.handleAddAddress();
          }}
        >
          <View
            style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
          >
            <Text
              style={styles.buttonText}
            >
              {global.capitalize(constants.TXT_ADD)}{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>


        {
          store.loading &&
          global.getLoader()
        }


      </View>
    )

  }


}
