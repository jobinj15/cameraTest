import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from '../../styles/style';


export default class Forgot extends Component {
  constructor(props) {
    super(props);
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

    );
  }
}
