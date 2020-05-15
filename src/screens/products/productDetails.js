import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';

@inject(stores => ({
    productsStore: stores.productsStore,
    cartStore: stores.cartStore,
}))

@observer
export default class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
        this.onPlusClicked = this.onPlusClicked.bind(this);
        this.onMinusClicked = this.onMinusClicked.bind(this);

        const { navigation } = this.props
        this.state.index = navigation.getParam(constants.PARAM_INDEX, null)

    }


    render() {

        const item = this.props.productsStore.products[this.state.index];
        console.log('ProductDetails ' + JSON.stringify(item))

        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <Card.Image imageSource={item.image}
                    style={{
                        height: 180, width: global.DEVICE_WIDTH - 20, marginTop: 10,
                        marginHorizontal: 10
                    }}
                />

                <View
                    style={{
                        padding: 10, backgroundColor: colors.WHITE, marginTop: 5,
                        marginHorizontal: 10
                    }}
                >
                    <Text
                        style={[styles.stripLabel, { flex: undefined }]}
                    >
                        {item.description}
                    </Text>

                    <Text
                        style={[styles.labelSmall, { marginTop: 8 }]}
                    >

                        {item.quantity}

                    </Text>

                    <Text
                        style={[styles.labelSmall, { marginTop: 8, color: colors.GREEN_4 }]}
                    >

                        {constants.SYMBOL_RUPEE + item.amount}

                    </Text>


                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        />


                        {
                            !isNaN(item.count) && (

                                <View
                                    style={[styles.plusContainer, {
                                        marginTop: 10,
                                    }]}
                                >

                                    <PlusView
                                        index={this.state.index}
                                        type={constants.TYPE_MINUS}
                                        onPress={this.onMinusClicked}
                                    />
                                    <Text
                                        style={[styles.stripLabel, {
                                            textAlign: 'center', marginTop: 4
                                            , color: colors.GREY
                                        }]}
                                    >{item.count}</Text>

                                    <PlusView
                                        index={this.state.index}
                                        type={constants.TYPE_PLUS}
                                        onPress={this.onPlusClicked}
                                    />
                                </View>
                            )
                        }

                    </View>

                </View>

                {this.bottomView()}
                {
                    item.count &&
                    this.bottomBlockView()
                }

            </View>
        );
    }

    bottomBlockView() {
        return (
            <View
                style={[styles.bottomView, {height:45, backgroundColor: "rgba(255,255,255,0.6)" }]}
            />
        )
    }

    bottomView() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.onAddToCart();
                }}
            >
                <View
                    style={[styles.bottomView,{height:45}]}
                >
                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE, textAlign: 'center' }]}
                    >
                        {constants.TXT_ADDTOCART}
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        )
    }


    onPlusClicked() {
        const item = this.props.productsStore.plusCart(this.state.index)
        console.log("Item onPlusClicked: " + JSON.stringify(item))
        this.props.cartStore.plusCart(null, item.productId)
    }

    onMinusClicked() {
        const item = this.props.productsStore.minusCart(this.state.index)
        this.props.cartStore.minusCart(null, item.productId)
    }

    onAddToCart() {
        const item = this.props.productsStore.addToCart(this.state.index)
        console.log("Item added: " + JSON.stringify(item))
        this.props.cartStore.addToCart(null, item)
    }

}


