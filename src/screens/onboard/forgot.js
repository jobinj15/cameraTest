import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../../styles/style';
import constants from '../../utility/constants';
import global from '../../utility/global';
import user_repository from '../../repos/user_repository';
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext/circular";
import Ripple from 'react-native-material-ripple';
import colors from '../../styles/colors/default';

var forgotApiData = {
  username: ''
}


export default class Forgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: ''
    }
  }

  handleClick() {
    if (!this.state.username) {
      global.showMessage(constants.ERROR_USERNAME)
    }
    else {
      this.setState({ loading: true }, () => {
        forgotApiData.username = this.state.username
        user_repository.forgotPassword(global.sendAsFormData(forgotApiData),
          this.onForgotResp.bind(this))
      })
    }
  }

  onForgotResp(isError, response) {
    this.setState({ loading: false }, () => {
      global.showMessage(response.message)

      if (!isError) {
        this.props.navigation.pop()
      }
    })
  }

  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value });
  }


  render() {
    return (
      <View
        style={[
          styles.styleFull, {
            padding: 15,
            backgroundColor: colors.WHITE
          }]}
      >


        <ScrollView
          style={{
            paddingHorizontal: 15
          }}
          {...constants.SCROLL_VIEW_PROPS}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >

            <Image
              style={{
                width: global.rw(50),
                height: global.rw(50),
                marginTop:30,
                backgroundColor: colors.WHITE,
              }}
              resizeMode='contain'
              source={require('../../assets/images/forgot_top.png')}
            />

            <Text
              style={[styles.labelMed, { textAlign: 'center', fontSize: fonts._16 }]}
            >
              {constants.TXT_FORGOT_PASS}
            </Text>


            <Text
              style={[styles.labelSmallX1, { textAlign: 'center', marginBottom: 20 }]}
            >
              {constants.TXT_FORGOT_DESC}
            </Text>


            <FloatingTitleTextInputField
              attrName={'username'}
              title={constants.TXT_EMAIL}
              value={this.state.username}
              style={{
                marginBottom: 15
              }}
              keyboardType={constants.KEYBOARD_EMAIL}
              disabled={this.state.loading}
              updateMasterState={this._updateMasterState}
              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 30,
              }}
            />


            <Ripple
              onPress={() => {
                // this.handleClick();
              }}
              rippleColor={colors.RIPPLE}
              style={[styles.largeButton, { marginLeft: 0, paddingHorizontal: 40, marginTop: 10 }]}
            >

              <Text
                style={styles.buttonText}
              >
                {constants.TXT_SEND}{" "}
              </Text>
            </Ripple>

            <View
              style={{
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                marginBottom: 30,
                flexDirection: 'row'
              }}
            >
              <Text
                style={[styles.labelSmallX1, { color: colors.BLACK }]}
              >
                {'Back To'}{' '}

              </Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.pop()
                }}
              >
                <Text
                  style={[styles.labelSmallX1, { color: colors.BLUE }]}
                >
                  {'Login Screen'}{' '}
                </Text>
              </TouchableOpacity>


            </View>

            <Image
              style={[styles.circles, { marginTop: global.rh(10)}]}
              resizeMode='contain'
              source={require('../../assets/images/circles.png')}
            />


            <Image
              style={[styles.logo,{marginBottom: 30 }]}
              resizeMode='contain'
              source={require('../../assets/images/logo.png')}
            />


          </View>

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

    );
  }
}
