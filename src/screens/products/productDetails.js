import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';

var prodStore, cartStore;

var addApiData = {
    user_id: '',
    catalogue_id: '',
    quantity: ''
}

var detailApiData = {
    catlogue_id: '',
    user_id: ''
}

var updateApiData = {
    user_id: '',
    catalogue_id: '',
    quantity: '',
    cart_id: ''
}

var removeCartApiData = {
    cart_id: ''
}



@inject(stores => ({
    productDetailsStore: stores.productDetailsStore,
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

        prodStore = this.props.productDetailsStore
        cartStore = this.props.cartStore

        const { navigation } = this.props
        this.state.product = navigation.getParam(constants.PARAM_PRODUCT, null)

    }

    componentDidMount() {

        global.getItem(constants.USER).then(result => {
            if (!result) return;
            this.setUserIdToApiData(result)
        });

        this.callApi();

    }

    componentWillUnmount() {
        prodStore.isApiLoaded = false;
        prodStore.product = {}
    }

    setUserIdToApiData(result) {
        addApiData.user_id = result.user_id
        detailApiData.user_id = result.user_id
        removeCartApiData.user_id = result.user_id
        updateApiData.user_id = result.user_id
    }

    callApi() {
        detailApiData.catlogue_id = this.state.product.id
        prodStore.getProductDetails(global.sendAsFormData(detailApiData))
    }


    drawVariants(item) {

        if(!item.variants || !item.variants.length)
        return(
            <View/>
        )

        return (
            <View
                style={{ flexDirection: 'row', marginTop: 10 }}
            >
                <View
                    style={{ flex: 1 }}
                />

                <View
                    style={[styles.wrap]}
                >
                    {
                        item.variants.map((item, index) => {
                            return (
                                <Text
                                    style={[styles.variant]}
                                >
                                    {item.name}
                                </Text>
                            )
                        })
                    }

                </View>


            </View>
        )

        // return (
        //     item.variants.map((item, index) => {
        //         return (
        //             <Text
        //                 style={[styles.variant]}
        //             >
        //                 {item.name}
        //             </Text>
        //         )
        //     })
        // )
    }


    render() {


        if (prodStore.isApiLoaded && !prodStore.product.id)
            return (
                global.getNoDataView()
            )

        if (prodStore.loading) {
            return (
                global.getLoader()
            )
        }

        const item = prodStore.product;
        console.log('ProductDetails ' + JSON.stringify(item))

        var image = require('../../assets/images/pic2.jpg');

        if (Array.isArray(item.images) && item.images.length) {
            image = { uri: item.images[0].images };
            // console.log('Products row ' + JSON.stringify(image))
        }


        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <Card.Image imageSource={image}
                    style={{
                        height: 180, width: global.DEVICE_WIDTH - 20, marginTop: 10,
                        marginHorizontal: 10
                    }}
                    cover={false}
                />

                <View
                    style={{
                        padding: 10, backgroundColor: colors.WHITE, marginTop: 5,
                        marginHorizontal: 10
                    }}
                >
                    <Text
                        style={[styles.stripLabel, { backgroundColor: colors.GREEN }]}
                    >
                        {item.name}
                    </Text>

                    <Text
                        style={[styles.labelSmall]}
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

                        {constants.SYMBOL_RUPEE + item.price}

                    </Text>


                    {/* {this.drawVariants(item)} */}


                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        />

                        {this.drawButtonView(item)}

                    </View>

                </View>

                {this.bottomView()}
                {
                    item.cart_quantity ? this.bottomBlockView() : <View />
                }

            </View>
        );
    }

    drawButtonView(item) {

        // if (index == 0)
        //     console.log('drawButtonView: ' + JSON.stringify(item))

        if (item.loading)
            return (
                <View
                    style={[styles.plusContainer, {
                        marginTop: 10,
                        justifyContent: 'center',
                        borderColor: colors.WHITE
                    }]}
                >
                    <ActivityIndicator size="small" color={colors.DARKGRAY} />


                </View>
            )

        if (!item.cart_quantity)
            return (
                <View />
            )

        return (
            <View
                style={[styles.plusContainer, {
                    marginTop: 10,
                    borderColor: colors.ListViewBG
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
                >{item.cart_quantity}</Text>

                <PlusView
                    index={this.state.index}
                    type={constants.TYPE_PLUS}
                    onPress={this.onPlusClicked}
                />
            </View>
        )

    }


    bottomBlockView() {
        return (
            <View
                style={[styles.bottomView, { height: 45, backgroundColor: "rgba(255,255,255,0.6)" }]}
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
                    style={[styles.bottomView, { height: 45 }]}
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
        // const item = prodStore.plusCart(this.state.index)
        // console.log("Item onPlusClicked: " + JSON.stringify(item))
        // cartStore.plusCart(null, item.id)

        if (prodStore.cartUpdating)
            return;

        var item = prodStore.products[this.state.index];
        updateApiData.catalogue_id = item.id;
        updateApiData.quantity = item.cart_quantity + 1;
        updateApiData.cart_id = item.cart_id;

        console.log('ProdDetails: ' + JSON.stringify(updateApiData))

        prodStore.updateCart(global.sendAsFormData(updateApiData), this.state.index, null, constants.TYPE_PLUS)


    }

    onMinusClicked() {
        // const item = prodStore.minusCart(this.state.index)
        // cartStore.minusCart(null, item.id)

        if (prodStore.cartUpdating)
            return;

        var item = prodStore.products[this.state.index];
        updateApiData.catalogue_id = item.id;
        updateApiData.quantity = item.cart_quantity - 1;
        updateApiData.cart_id = item.cart_id;

        if (item.cart_quantity == 1)
            prodStore.deleteItem(global.sendAsFormData(updateApiData), this.state.index)
        else
            prodStore.updateCart(global.sendAsFormData(updateApiData), this.state.index, null, constants.TYPE_MINUS)
    }

    onAddToCart() {
        // const item = prodStore.addToCart(this.state.index)
        // console.log("Item added: " + JSON.stringify(item))
        // cartStore.addToCart(null, item)

        if (prodStore.cartUpdating)
            return;

        var item = prodStore.products[this.state.index];
        addApiData.catalogue_id = item.id;
        addApiData.quantity = 1;

        prodStore.addToCart(global.sendAsFormData(addApiData), this.state.index)
    }

}


