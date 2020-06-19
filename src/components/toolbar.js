import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  AppRegistry,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconFIS from 'react-native-vector-icons/Fontisto';
import IconO from 'react-native-vector-icons/Octicons';
import IconI from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import styles from '../styles/style';
import global from '../utility/global';
import colors from '../styles/colors';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar
      backgroundColor={backgroundColor} {...props} />
  </View>
);
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Dropdown } from '../components/custom_views/dropdown'
import constants from '../utility/constants';
import fonts from '../utility/fonts';

export default class ToolBar extends Component {


  static propTypes = {
    showMarker: PropTypes.bool,
    showBackButton: PropTypes.bool,
    showTitle: PropTypes.bool,
    showTitleSubtitle: PropTypes.bool,
    showEndButton: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showEdit: PropTypes.bool,
    endIcon: PropTypes.string,
    endIcon2: PropTypes.string,
    showDoneButton: PropTypes.bool,
    enableDoneButton: PropTypes.bool,
  };
  static defaultProps = {
    showBackButton: true,
    showEndButton: false,
    showDoneButton: false,
    showTitleSubtitle: false,
    showTitle: false,
    showTitleH: false,
    title: '',
    iconType: '',
    iconType2: '',
    endIcon: 'ios-search',
    enableDoneButton: false,
  };

  constructor(props) {
    super(props);
    console.log('\n---------- ToolBar Called -----------\n');
    this.state = {
      searchText: '',
    }
    // console.log('showLocationView'+this.props.showLocationView);

  }

  close() {
    this.props.navigation.goBack(null)
    // this.props.navigation.pop();
  }



  render() {

    console.log('renderToolbar : ' + JSON.stringify(this.props.showEndButton))

    return (
      <View style={styles.toolbar}>
        <View style={[styles.styleFull, { flexDirection: 'row', marginHorizontal: 8, alignItems: 'center' }]}>

          {this.props.showBackButton &&
            <TouchableHighlight
              style={[styles.touchable, { padding: 0 }]}
              onPress={() => this.close()}
              underlayColor='#dddddd'>
              <IconM name={'arrow-back'} size={25} color={colors.BLACK} />
            </TouchableHighlight>
          }

          {
            this.props.showDropdown &&
            <View style={{ alignItems: 'flex-start', flex: 1, paddingHorizontal: 15 }}>
              <Text numberOfLines={1} style={[styles.title, {
                marginTop: 8, fontFamily: global.FONT_FAMILY.PopinsBold
              }]}>{this.props.title}</Text>
            </View>
          }
          {
            this.props.showTitleH &&
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text numberOfLines={1} style={[styles.title, { marginTop: 8 }]}>{this.props.title}</Text>
            </View>
          }

          {
            this.props.showTitle &&
            <Text numberOfLines={1} style={[styles.titleSmall, {
            }]}>{this.props.title}</Text>
          }

          {this.props.showEditButton &&
            <TouchableHighlight
              onPress={() => this.route('edit_task')}
              style={[styles.touchable, { padding: 10 }]}

              underlayColor='#dddddd'>
              <IconM name={'ios-edit'} size={25} color={colors.BLACK} />

            </TouchableHighlight>
          }

          {this.props.showEndButton &&
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => this.props.onEndIconClicked()}
              underlayColor='#dddddd'>
              {this.getEndIcon(this.props.iconType, this.props.endIcon)}
            </TouchableOpacity>
          }

          {this.props.showEndButton2 &&
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => this.props.onEndIconClicked2()}
              underlayColor='#dddddd'>
              {this.getEndIcon(this.props.iconType2, this.props.endIcon2)}
            </TouchableOpacity>
          }



          {this.props.showDoneButton &&
            <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-end' }}>
              <TouchableHighlight
                style={{ padding: 10, marginRight: 10 }}
                onPress={() => this.props.onDoneClick()}
                underlayColor={this.props.enableDoneButton ? colors.WHITE : ''}>
                <Text style={[styles.subheadertext, { color: this.props.enableDoneButton ? colors.WHITE : colors.SECONDARY_TEXTCOLOR }]}>Done</Text>
              </TouchableHighlight>
            </View>
          }

          {
            this.props.showSearchView &&
            <View
              style={{ flex: 1, justifyContent: 'center' }}
            >

              <TextInput
                value={this.state.searchText}
                style={{
                  flex: 1,
                  underlineColorAndroid: 'transparent',
                  fontSize: fonts._16,
                  paddingRight: 60,
                }}
                autoFocus={true}
                onSubmitEditing={()=>{
                  if(this.props.onSubmit && this.state.searchText)
                  this.props.onSubmit(this.state.searchText,false)
                }}
                placeholder={constants.TXT_SEARCH}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                onChangeText={(searchText) => {
                  this.setState({searchText})
                }}

              />

              <Ripple
                rippleColor={colors.RIPPLE}
                style={{
                  position: 'absolute',
                  right: 10
                }}
                onPress={()=>{
                  this.setState({searchText:''},()=>{
                    this.props.onSubmit('',true)
                  })
                }}
              >
                <IconM name={'close'} size={25} color={colors.BLACK} />

              </Ripple>

            </View>
          }


          {this.props.showBoxButton &&
            <Ripple style={{
              justifyContent: 'center', paddingVertical: 3, paddingHorizontal: 8,
              borderWidth: 0.5,
              borderRadius: 5
            }}
              rippleColor={colors.RIPPLE}
            >

              <Text
                style={[styles.labelSmall]}
              >
                {this.props.boxText}
              </Text>

            </Ripple>
          }




        </View>


      </View>

    );
  }


  getEndIcon(iconType, icon) {
    switch (iconType) {
      default:
        return (
          <IconF name={icon} size={25} color={colors.BLACK} />
        )

      case constants.IC_IONIC:
        return (
          <IconI name={icon} size={25} color={colors.BLACK} />
        )

      case constants.IC_OCT:
        return (
          <IconO name={icon} size={25} color={colors.BLACK} />
        )

      case constants.IC_FONTISCO:
        return (
          <IconFIS name={icon} size={20} color={colors.BLACK} />
        )

    }
  }

}


module.exports = ToolBar;
