import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from '../../styles/style';
import constants from '../../utility/constants';
import global from '../../utility/global';
import user_repository from '../../repos/user_repository';
import { FloatingTitleTextInputField } from "../../components/custom_views/floatingtext";

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
          styles.styleFull,{
            padding: 15
          }]}
      >

        {global.getIosToolbar(this.props.navigation)}


        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            paddingHorizontal: 15
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
          >

            <Text
              style={[styles.bigBoldOnBoard, { marginHorizontal: 15, marginBottom: 15 }]}
            >
              {constants.TXT_FORGOT_PASS.replace('?', '')}

            </Text>


            <FloatingTitleTextInputField
              attrName={'username'}
              title={constants.TXT_USERNAME}
              value={this.state.username}
              style={{
                marginBottom: 15
              }}
              disabled={this.state.loading}
              updateMasterState={this._updateMasterState}

              otherTextInputProps={{   // here you can add other TextInput props of your choice
                maxLength: 30,
              }}
            />


            <TouchableWithoutFeedback
              onPress={() => {
                this.handleClick();
              }}
            >
              <View
                style={[styles.largeButton, {marginLeft: 0, paddingHorizontal: 40,marginTop:10 }]}
              >
                <Text
                  style={styles.buttonText}
                >
                  {global.capitalize(constants.TXT_RESET)}{" "}
                </Text>
              </View>
            </TouchableWithoutFeedback>


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
