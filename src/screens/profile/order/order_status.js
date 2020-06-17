import React, { Component } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { View, Card, Text, Button } from 'react-native-ui-lib';

import colors from '../../../styles/colors';
import styles from '../../../styles/style';
import Dash from 'react-native-dash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import global from '../../../utility/global';

import LottieView from 'lottie-react-native';

class OrderStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [
      //   {
      //     text: 'Order Placed',
      //     desc: constants.TXT_ORDERS_DESC,
      //     icon: 'dropbox',
      //     navigate: 'MyOrders',
      //   },
      //   {
      //     text: 'Order Confirmed',
      //     desc: constants.TXT_ADDR_DESC,
      //     icon: 'map-marker',
      //     navigate: 'Addresses',
      //   },
      //   {
      //     text: 'Order Dispatched',
      //     desc: constants.TXT_ORDERS_DESC,
      //     icon: 'dropbox',
      //     navigate: 'MyOrders',
      //   },
      //   {
      //     text: 'Delivered',
      //     desc: constants.TXT_ADDR_DESC,
      //     icon: 'map-marker',
      //     navigate: 'Addresses',
      //   },
      // ],
      data: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('getDerivedStateFromProps: ' + nextProps + ' ' + prevState)

    if (nextProps != prevState) {

      if (Array.isArray(nextProps.data)) {

        let data = nextProps.data;
        let statusCode = nextProps.statusCode;
        // let statusCode = 400;
        let doneStatus = true;

        console.log('getDerivedStateFromProps: ' + JSON.stringify(data))

        data.sort(function (a, b) {
          return a.sequence > b.sequence
        });

        for (let item of data) {
          if (item.order_status_code == statusCode) {
            item.selected = true;
            doneStatus = false;
          }
          else {
            item.done = doneStatus;
            item.selected = false;
          }
          // item.description = 'testjgsjdfg'
        }

        return { data: data }

      }

      return null;

    }

    return null;
  }



  componentDidMount() { }
  render() {
    return (
      <View>
        <FlatList
          navigation={this.props.navigation}
          extraData={this.state}
          style={{ backgroundColor: 'white' }}
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
          width: 50,
          height: 50,
          marginLeft: -3,
          alignItems: 'center',
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

  renderCircle = (item) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: 22,
          height: 22,
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View
          style={[global.getCircleViewStyle(22), { backgroundColor: item.done?'green':colors.GREY }]}
        >

         {item.done && <Icon name={'done'} size={15} color={colors.WHITE} />}         
   
        </View>
      </View>
    );
  };

  renderRow({ item, index }) {
    return (
      <TouchableWithoutFeedback
        style={{ backgroundColor: 'green' }}
      // onPress={() => {
      //   if (item.onClick) {
      //     item.onClick();
      //     return;
      //   }
      //   this.navigateTo(item);
      // }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center'
              // backgroundColor: 'transparent',
            }}>
            {this.dashLine(index, 1)}
            {item.selected ? this.renderCircle(item) : this.renderCircle(item)}
            {this.dashLine(index, 2)}
          </View>
          <View style={{ marginLeft: 15, justifyContent: 'center', height: 50 }}>
            <Text style={[styles.productKey, { padding: 0}]}>{item.order_status}</Text>

            {item.description ? (
              <Text
                style={[
                  styles.labelSmall,
                  { padding: 0,marginTop:-5 , color: colors.DISCOUNT },
                ]}>
                {item.description}
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
