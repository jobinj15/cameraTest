import React, {Component} from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {View, Card, Text, Button, Image} from 'react-native-ui-lib';

import colors from '../../../styles/colors';
import styles from '../../../styles/style';
import Dash from 'react-native-dash';

import global from '../../../utility/global';

import LottieView from 'lottie-react-native';

class OrderItems extends Component {
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
          extraData={this.props}
          style={{backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false}
          data={this.props.orders}
          renderItem={this.renderRow.bind(this)}
          listKey={(item, index) => 'orderItems'+index.toString()}
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
    let image = '';
    // let image = '';
    let variant = '';

    if (Array.isArray(item.variants) && item.variants.length)
      variant = item.variants[0].value;

    if (Array.isArray(item.images) && item.images.length) {
      image = {uri: item.images[0]};
    }

    // console.log(image);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.navigateTo('ProductDetail', index);
        }}>
        <Card
          style={{flex: 1, borderRadius: 0}}
          key={index}
          elevation={0}
          enableShadow={false}>
          <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={styles.productImageSmall}>
                <Image source={image} style={styles.productThumbnailSmall} />
              </View>
        
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text style={[styles.stripLabel, {}]} numberOfLines={2}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',                    
                    flex: 1,
                    alignItems:'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={[styles.weight]}>1 kg</Text>
                    <Text style={[styles.weight, {marginLeft: 20}]}>
                      {item.qty} {'qty'}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.amount]}>
                      {constants.SYMBOL_RUPEE + item.total}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <View
                            style={{ flexDirection: 'row', flex: 1 }}
                        >
                            <View
                                style={{
                                    flex: 1
                                }}
                            />
                            {this.drawButtonView(item, index)}


                        </View> */}
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default OrderItems;
