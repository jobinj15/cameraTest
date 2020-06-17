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
import ToolBar from '../../components/toolbar';
import Ripple from 'react-native-material-ripple';

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
@observer
export default class AddAddress extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    store = this.props.addStore
    const { navigation } = this.props
    this.state.userId = navigation.getParam(constants.PARAM_USER, null)
    this.state.mode = navigation.getParam(constants.PARAM_MODE, null)
    this.state.item = navigation.getParam(constants.PARAM_ITEM, null)
    this.state.onFirstAddressAdded = navigation.getParam('onFirstAddressAdded', null)

    // if(this.state.mode!=constants.MODE_FIRST_ADD)
    this.afterAddressAdded = this.afterAddressAdded.bind(this)

    if (this.state.mode == constants.MODE_EDIT)
      this.populateFields(this.state.item);
    // else this.state = {...this.state,...this.mapKeysToState()};

    console.log('onFirstAddressAdded ' + this.state.onFirstAddressAdded)

  }

  populateFields(data) {

    console.log('populateFields: ' + this.state.mode)

    if (!this.state.mode)
      return;

    for (let item in fields) {

      console.log("Loop Item: " + item + fields[item] + "\n")

      this.state[fields[item]] = data[fields[item]]
    }

    this.state.state = data.state;
    this.state.city = data.city;

    if (this.state.state)
      store.state = this.state.state;

    if (this.state.city)
      store.city = this.state.city

    store.isValidPin = true;
    console.log('populateFields: ' + JSON.stringify(this.state))


  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <ToolBar
          title={navigation.state.params.Title}
          showTitle={true}
          navigation={navigation}
          showBackButton={true}
        />
      ),
    };
  };


  updateToolbarTitle = (titleText) => {
    console.log('updateToolbarTitle: ' + titleText)
    this.props.navigation.setParams({
      Title: titleText,
    });
  }


  afterAddressAdded() {

    //Set first address as selected address so that it can be displayed in cart page

    console.log('afterAddressAdded !!' + this.state.mode)
    const listStore = this.props.listStore;

    // if(listStore.addressList.length==1)
    // listStore.selectedAddress = listStore.addressList[0]

    //Notify the cart select address page about first address added
    // if (this.state.mode == constants.MODE_FIRST_ADD) {
    //   if (this.onFirstAddressAdded)
    //     this.onFirstAddressAdded();  

    //   this.props.navigation.pop();
    //   return;
    // }

    //Refresh the addressListing page if coming from addressList page
    listApiData.user_id = this.state.userId;
    listStore.apiLoaded = false;
    listStore.getAddressList(global.sendAsFormData(listApiData), listApiData.page_no)
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
    store.setAfterAddressAdded(this.afterAddressAdded);
    this.updateToolbarTitle(this.state.mode == constants.MODE_EDIT ? constants.TXT_UPDATE + ' Address'
      : constants.TXT_ADD_ADDRESS)

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

    if (this.state.mode == constants.MODE_EDIT)
      formdata.append('address_id', this.state.item.id)




    console.log("AllData : " + JSON.stringify(formdata))

    return formdata;
  }

  componentWillUnmount() {
    store.state = constants.TXT_STATE
    store.city = constants.TXT_CITY
  }

  handleAddAddress() {

    var data = this.validateAndAddAddress();

    if (!data)
      return;

    store.addAddress(data, this.state.mode)

  }



  render() {

    return (
      <View
        style={[
          styles.styleFull, { backgroundColor: colors.WHITE }
        ]}
      >

        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            padding: 15
          }}
          showsVerticalScrollIndicator={false}
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

            <View
              style={{
                alignSelf: 'stretch', flexDirection: 'row', marginBottom: 15
              }}
            >

              <FloatingTitleTextInputField
                attrName={fields.PINCODE}
                title={constants.TXT_PIN}
                value={this.state[fields.PINCODE]}
                style={{
                  flex: 1
                }}
                onChange={pin => {
                  this.setState({ [fields.PINCODE]: pin.replace(/[^0-9]/g, '') }, () => {
                    if (pin && pin.length > 5) {
                      store.isValidPin = false;
                      pinApiData.pincode = pin;
                      store.getPin(global.sendAsFormData(pinApiData))
                    }
                    else {
                      store.state = ''
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
                attrName={constants.TXT_STATE}
                title={constants.TXT_STATE}
                style={{
                  marginLeft: 30, flex: 1
                }}
                disabled={store.loading}
                value={store.state == constants.TXT_STATE ? '' : store.state}
                updateMasterState={this._updateMasterState}
                otherTextInputProps={{
                  editable: false
                }}
              />




            </View>


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
                height: 80
              }}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                numberOfLines: 5,
                multiline: true
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



            {/* <Text
              style={[styles.labelBorder, { marginBottom: 10 }]}
            >

              {store.state}

            </Text> */}



            <FloatingTitleTextInputField
              attrName={constants.TXT_CITY}
              title={constants.TXT_CITY}
              disabled={store.loading}
              value={store.city == constants.TXT_CITY ? '' : store.city}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{
                editable: false
              }}
            />


            {/* Address Types */}
            <View
              style={{ alignSelf: 'stretch',marginBottom: 100, marginTop: 30 }}
            >

              <Text
                style={{
                  fontSize: 15,
                  marginBottom:15,
                  color: 'dimgrey'
                }}

              >
                {'Type of Address'}
              </Text>

              <View
                style={{ alignSelf: 'stretch', flexDirection: 'row' }}
              >
                {this.drawAddressTypes(store.addressTypes)}

              </View>

            </View>

            {/* <Text
              style={[styles.labelBorder, { marginBottom: 150 }]}
            >

              {store.city}

            </Text>
 */}

          </View>

        </ScrollView>

        <View
          style={[styles.bottomlayout, { bottom: 0 }]}
        >

          <Ripple
            onPress={() => {
              this.handleAddAddress();
            }}
            style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
            rippleColor={colors.RIPPLE}
          >
            <Text
              style={styles.buttonText}
            >
              {this.state.mode == constants.MODE_EDIT ? global.capitalize(constants.TXT_UPDATE)
                : global.capitalize(constants.TXT_ADD)}{" "}
            </Text>
          </Ripple>


        </View>



        {
          store.loading &&
          global.getLoader()
        }


      </View>
    )

  }


  modifyAddressType(selIndex) {
    var items = [...store.addressTypes];
    console.log('modifyAddressType: ' + JSON.stringify(items))

    for (let [index, item] of items.entries()) {
      if (index == selIndex){
        item.selected = true;
        store.selectedAddressType = index;
      }
      else item.selected = false;
    }

    store.addressTypes = items
  }

  drawAddressTypes(items) {
    return (
      items.map((item, index) => {
        let borderColor, backgroundColor, textColor;

        if (item.selected) {
          borderColor = colors.PRIMARY;
          backgroundColor = colors.PRIMARY;
          textColor = colors.WHITE
        }
        else {
          borderColor = colors.GREY;
          backgroundColor = colors.WHITE;
          textColor = colors.BLACK
        }

        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.modifyAddressType(index)
            }}
            key={(index).toString()}
          >
            <View
              style={[styles.filterItem,
              {
                backgroundColor: backgroundColor,
                borderColor: borderColor, paddingVertical: 1,
                marginLeft: index ? 10 : 0, alignItems: 'center',
                flexDirection: 'row'
              }]}
            >
              <Text
                style={{
                  color: textColor,
                  fontFamily: global.FONT_FAMILY.PopinsMed,
                  fontSize: fonts._12
                }}
              >
                {item.text}
              </Text>

            </View>


          </TouchableWithoutFeedback>
        )
      })
    )
  }


}
