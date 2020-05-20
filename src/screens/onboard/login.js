import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles/style';
import global from '../../utility/global'
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext";
import constants from '../../utility/constants'
import user_repository from '../../repos/user_repository'
import { StackActions,NavigationActions} from 'react-navigation';


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
        global.showToast(constants.NO_INTERNET)
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
        global.showMessage("Login successfull!")
        this._interval = setTimeout(() => {

          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({
              routeName: route, params: {
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

  render() {

    return (
      <View
        style={[
          styles.styleFull
        ]}
      >

        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            padding: 15
          }}

        >
          <View

          >
            <FloatingTitleTextInputField
              attrName={fields.USER_NAME}
              title={constants.TXT_USERNAME}
              value={this.state[fields.USER_NAME]}
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
                maxLength: 30,
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

        </ScrollView>

        <View
          style={styles.bottomlayout}
        >

          <TouchableWithoutFeedback
            onPress={() => {
              this.handleLogin();
            }}
          >
            <View
              style={[styles.largeButton, { width: undefined, marginLeft: 0, paddingHorizontal: 40 }]}
            >
              <Text
                style={styles.buttonText}
              >
                {global.capitalize(constants.TXT_LOGIN)}{" "}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>


      </View>
    )

  }


}
