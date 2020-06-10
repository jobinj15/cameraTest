import React, { Component } from 'react';
import { View, Text,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from "mobx-react";
import global from '../utility/global';
import styles from '../styles/style';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  

@inject("cartStore")
@observer
export default class CartBubble extends Component {

    constructor(props) {
        super(props)
    }


    getBubble(store) {
        if (store.noOfItems)
            return (
                <View
                    style={[global.getCircleViewStyle(18),
                    { backgroundColor: 'red', top: 2, right: wp('5%'), position: 'absolute' }]}
                >
                    <Text
                        style={styles.labelMini}
                    >
                        {store.noOfItems}
                    </Text>
                </View>
            )

          return(<View/>)  
    }

    render() {

        const store = this.props.cartStore;

        return (
            <View
                style={{
                    width: '100%', height: '100%',
                    alignItems: 'center', justifyContent: 'center'
                }}
            >
                {/* <Icon name={this.props.icon} size={25} color={this.props.tintColor} /> */}
                <Image style={{width:30,height:30}} source={this.props.icon} tintColor={this.props.tintColor} />
                 {this.getBubble(store)} 
            </View>
        )
    }

}
