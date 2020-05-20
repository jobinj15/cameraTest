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

import Icon from 'react-native-vector-icons/MaterialIcons';
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

export default class ToolBar extends Component {


  static propTypes = {
    showMarker: PropTypes.bool,
    showBackButton: PropTypes.bool,
    showTitle: PropTypes.bool,
    showTitleSubtitle: PropTypes.bool,
    showSearchButton: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showEdit: PropTypes.bool,
    showDoneButton: PropTypes.bool,
    enableDoneButton: PropTypes.bool,
  };
  static defaultProps = {
    showBackButton: true,
    showSearchButton: false,
    showDoneButton: false,
    showSearchButton: false,
    showTitleSubtitle: false,
    showTitle: false,
    showTitleH: false,
    title: '',
    enableDoneButton: false,
  };

  constructor(props) {
    super(props);
    console.log('\n---------- ToolBar Called -----------\n');
    this.state = {
      doRefresh: false,
    }
    // console.log('showLocationView'+this.props.showLocationView);

  }

  close() {
    this.props.navigator.pop();
  }



  render() {

    // console.log('renderToolbar : ' + JSON.stringify(this.props))

    return (
      <View style={styles.toolbar}>
        <View style={[styles.styleFull, { flexDirection: 'row', marginHorizontal: 8 }]}>

          {this.props.showBackButton &&
            <TouchableHighlight
              style={[styles.touchable, { padding: 0 }]}
              onPress={() => this.close()}
              underlayColor='#dddddd'>
              <Icon name={'arrow-back'} size={25} color={colors.BLACK} />
            </TouchableHighlight>
          }

          {
            this.props.showTitleH &&
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text numberOfLines={1} style={[styles.title, { marginTop: 8 }]}>{this.props.title}</Text>
            </View>
          }

          {
            this.props.showTitle &&
            <Text numberOfLines={1} style={[styles.title, { marginTop: 8 }]}>{this.props.title}</Text>
          }

          <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flex: 1 }}>
            {this.props.showEditButton &&
              <TouchableHighlight
                onPress={() => this.route('edit_task')}
                style={[styles.touchable, { padding: 10 }]}

                underlayColor='#dddddd'>
                <Icon name={'ios-edit'} size={25} color={colors.BLACK} />

              </TouchableHighlight>
            }

            {this.props.showSearchButton &&
              <TouchableHighlight
                style={[styles.touchable, { padding: 10 }]}
                onPress={() => this.route('search')}
                underlayColor='#dddddd'>
                <Icon name={'ios-search'} size={25} color={colors.BLACK} />

              </TouchableHighlight>
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

          </View>


        </View>


      </View>

    );
  }

}


module.exports = ToolBar;
