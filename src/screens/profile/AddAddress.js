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

const fields = {
  FULL_NAME: 'full_name',
  ADDRESS: 'address',
  LANDMARK: 'landmark',
  PINCODE: 'pincode',
  MOBILE: 'mobile_no',
  AREA: 'area',
}

const errors = {
  [fields.FULL_NAME]: {
    error: constants.ERROR_FIRST_NAME
  },
  [fields.ADDRESS]: {
    error: constants.ERROR_ADDRESS,
  },
  [fields.LANDMARK]: {
    skipBlankCheck: true,
  },
  [fields.MOBILE]: {
    error: constants.ERROR_MOBILE,
    additional: global.isValidMobNo
  },
  [fields.PINCODE]: {
    error: constants.ERROR_PIN,
  },
  [fields.AREA]: {
    error: constants.ERROR_AREA,
  }
}



@inject("addAddressStore")
@observer
export default class AddAddress extends Component {

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
        global.showToast(constants.NO_INTERNET)
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
        global.showMessage("Registered successfully!")
        this._interval = setTimeout(() => {
          // this.doLogin();
        }, 1000);
      } else {
        global.showMessage(responseData.message);
      }
    })

  }

  render() {

    const store = this.props.addAddressStore

    console.log('AddAddress ' +  JSON.stringify(store.stateIndex) )
    console.log('AddAddress ' +  JSON.stringify(store.states[store.stateIndex]) )

    return (
      <View
        style={[
          styles.styleFull, { backgrounColor: colors.WHITE }
        ]}
      >

        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            padding: 15,backgrounColor: colors.WHITE,
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
              disabled={this.state.loading}
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
              disabled={this.state.loading}
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
              attrName={fields.LANDMARK}
              title={constants.TXT_LANDMARK}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
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
                this.setState({ [fields.PINCODE]: pin.replace(/[^0-9]/g, '') })
              }}
              disabled={this.state.loading}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                keyboardType: "numeric"
              }}
            />


            <FloatingTitleTextInputField
              attrName={fields.AREA}
              title={constants.TXT_AREA}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
              value={this.state[fields.AREA]}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
              }}
            />

            <Dropdown
              label='Select State'
              data={store.states}
              valueExtractor={({ name }) => name}
              value={store.states[store.stateIndex].name}
              animationDuration={0}
              containerStyle={{

              }
              }
              onChangeText={(value, index, data) => {
                store.stateIndex = index
              }}
            />


            <Dropdown
              label='Select City'
              data={store.cities}
              valueExtractor={({ name }) => name}
              value={store.cities[store.cityIndex].name}
              animationDuration={0}
              containerStyle={{
                marginBottom:50
              }
              }
              onChangeText={(value, index, data) => {
                store.cityIndex = index
              }}
            />


          </View>

        </ScrollView>

        <View
          style={[styles.bottomlayout,{bottom:10,marginBottom:10}]}
        >

                  </View>

                  <TouchableWithoutFeedback
            onPress={() => {
              // this.handleRegister();
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
 

      </View>
    )

  }


}
