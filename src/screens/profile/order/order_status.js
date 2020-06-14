import React, {Component} from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {View, Card, Text, Button} from 'react-native-ui-lib';

import colors from '../../../styles/colors';
import styles from '../../../styles/style';
import Dash from 'react-native-dash';

import global from '../../../utility/global';

import LottieView from 'lottie-react-native';

class OrderStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          text: 'Order Placed',
          desc: constants.TXT_ORDERS_DESC,
          icon: 'dropbox',
          navigate: 'MyOrders',
        },
        {
          text: 'Order Confirmed',
          desc: constants.TXT_ADDR_DESC,
          icon: 'map-marker',
          navigate: 'Addresses',
        },
        {
          text: 'Order Dispatched',
          desc: constants.TXT_ORDERS_DESC,
          icon: 'dropbox',
          navigate: 'MyOrders',
        },
        {
          text: 'Delivered',
          desc: constants.TXT_ADDR_DESC,
          icon: 'map-marker',
          navigate: 'Addresses',
        },
        // {
        //     text: 'Theme',
        //     icon: '',
        //     onClick: this.openThemeDialog.bind(this)
        // }
      ],
    };
  }

  componentDidMount() {}
  render() {
    return (
      <View>
        <FlatList
          navigation={this.props.navigation}
          extraData={this.state}
          style={{backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  dashLine = (index, type) => {
    var dashStyle = 'lightgrey';
    if (index == 0 && type == 1) {
      dashStyle = 'white';
    } else if (index == this.state.data.length - 1 && type == 2) {
      dashStyle = 'white';
    }

    return (
      <View
        style={{
          flex: 1,
          width: 45,
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <Dash
          dashColor={dashStyle}
          style={{
            width: 1,
            flex: 1,
            flexDirection: 'column',
          }}
        />
      </View>
    );
  };

  renderRipple = () => {
    return (
      <View
        style={{
          alignSelf: 'flex-start',
          width: 45,
          height: 45,
          backgroundColor: 'transparent',
        }}>
        <LottieView
          source={require('../../../assets/animations/ripple-green.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  renderCircle = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: 18,
          height: 18,
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View
          style={[global.getCircleViewStyle(18), {backgroundColor: 'green'}]}
        />
      </View>
    );
  };

  renderRow({item, index}) {
    return (
      <TouchableWithoutFeedback
        style={{backgroundColor: 'green'}}
        onPress={() => {
          if (item.onClick) {
            item.onClick();
            return;
          }
          this.navigateTo(item);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: 'transparent',
            }}>
            {this.dashLine(index, 1)}
            {index == 1 ? this.renderRipple() : this.renderCircle()}
            {this.dashLine(index, 2)}
          </View>
          <View style={{flex: 1, marginLeft: 15}}>
            <Text style={[styles.productKey, {padding: 0}]}>{item.text}</Text>

            {item.desc ? (
              <Text
                style={[
                  styles.labelSmall,
                  {padding: 0, color: colors.DISCOUNT},
                ]}>
                {item.desc}
              </Text>
            ) : (
              <View />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default OrderStatus;
