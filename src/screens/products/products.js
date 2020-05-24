import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, FlatList, ActivityIndicator } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';

var listApiData = {
    page_no: 0,
    per_page: 10,
    cat_id: '',
    user_id: ''
}

var addApiData = {
    user_id: '',
    catalogue_id: '',
    quantity: ''
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

var prodStore,cartStore;

@inject(stores => ({
    productsStore: stores.productsStore,
    cartStore: stores.cartStore,
}))
@observer
export default class Products extends Component {
    constructor(props) {
        super(props);

        this.onPlusClicked = this.onPlusClicked.bind(this);
        this.onMinusClicked = this.onMinusClicked.bind(this);
        this.onApiActionDone = this.onApiActionDone.bind(this);

        prodStore = this.props.productsStore
        cartStore = this.props.cartStore

    }

    componentDidMount() {

        prodStore.onApiActionDone = this.onApiActionDone;

        global.getItem(constants.USER).then(result => {
            if (!result) return;

            this.setUserIdToApiData(result)

            this.callApi()
        });


    }

    setUserIdToApiData(result) {
        listApiData.user_id = result.user_id
        addApiData.user_id = result.user_id
        removeCartApiData.user_id = result.user_id
        updateApiData.user_id = result.user_id
    }

    callApi() {
        let formdata = new FormData();
        for (let key in listApiData) {
            formdata.append(key, listApiData[key]);
        }
        prodStore.getProducts(formdata, listApiData.page_no)
    }


    handleRefresh() {
        listApiData.page_no = 0
        prodStore.refreshing = true
        this.callApi()
    }


    handleLoadMore() {
        console.log('handleLoadMore called!')
        listApiData.page_no = listApiData.page_no + 1;
        this.callApi()
    }



    render() {

        return (
            <View style={[styles.styleFull]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={prodStore.products}
                    renderItem={this.renderRow.bind(this)}
                    onRefresh={this.handleRefresh.bind(this)}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.1}
                    refreshing={prodStore.refreshing}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {
                    prodStore.loading &&
                    global.getLoader()
                }

                {
                    (prodStore.apiLoaded && !prodStore.products.length)
                    && global.getNoDataView()
                }

            </View>
        );
    }


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };

    navigateTo(index) {

        const item = prodStore.products[index]

        this.props.navigation.navigate('ProductDetail', {
            [constants.PARAM_PRODUCT]: item,
        });
    }




    onPlusClicked(index) {

        if (prodStore.cartUpdating)
            return;

        var item = prodStore.products[index];
        updateApiData.catalogue_id = item.id;
        updateApiData.quantity = item.cart_quantity + 1;
        updateApiData.cart_id = item.cart_id;

        prodStore.updateCart(global.sendAsFormData(updateApiData), index, null, constants.TYPE_PLUS)
        // this.props.cartStore.plusCart(null, item.id)
    }

    onMinusClicked(index) {

        if (prodStore.cartUpdating)
            return;

        var item = prodStore.products[index];
        updateApiData.catalogue_id = item.id;
        updateApiData.quantity = item.cart_quantity - 1;
        updateApiData.cart_id = item.cart_id;

        if(item.cart_quantity==1)
        prodStore.deleteItem(global.sendAsFormData(updateApiData),index)
        else
        prodStore.updateCart(global.sendAsFormData(updateApiData), index, null, constants.TYPE_MINUS)
    }

    onAddToCart(index) {

        if (prodStore.cartUpdating)
            return;

        var item = prodStore.products[index];
        addApiData.catalogue_id = item.id;
        addApiData.quantity = 1;

        prodStore.addToCart(global.sendAsFormData(addApiData), index)
        // this.props.cartStore.addToCart(null, item)
    }


    onApiActionDone(item, type) {

        console.log('onApiActionDone: ' + type + ' ' + JSON.stringify(item))

        if (type == constants.TYPE_ADDCART)
            cartStore.afterAddCart(null, item)
        else if (type == constants.TYPE_PLUS)
            cartStore.afterPlusCart(null, item.cart_id)
        else cartStore.afterMinusCart(null, item.cart_id)

    }

    drawButtonView(item, index) {

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
                <Button
                    backgroundColor={colors.GREEN_4}
                    label={constants.TXT_ADDTOCART}
                    onPress={() => {
                        this.onAddToCart(index);
                    }}
                    labelStyle={{ fontWeight: 'bold', fontSize: 14 }}
                    style={[styles.addContainer, { marginTop: 10 }]}
                    borderRadius={3}
                    enableShadow
                />

            )

        return (
            <View
                style={[styles.plusContainer, {
                    marginTop: 10,
                    borderColor: colors.ListViewBG
                }]}
            >


                <PlusView
                    index={index}
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
                    index={index}
                    type={constants.TYPE_PLUS}
                    onPress={this.onPlusClicked}
                />
            </View>
        )

    }

    componentWillUnmount(){
        prodStore.products = []
        prodStore.apiLoaded = false;
    }

    renderRow({ item, index }) {


        var image = require('../../assets/images/pic2.jpg');

        if (Array.isArray(item.images) && item.images.length) {
            image = { uri: item.images[0].images };
            // console.log('Products row ' + JSON.stringify(image))
        }

        return (

            <TouchableWithoutFeedback
                onPress={
                    () => {
                        this.navigateTo(index)
                    }
                }
            >
                <Card style={{ flex: 1, borderRadius: 0 }} key={index}>

                    <View
                        style={{ padding: 10 }}
                    >
                        <View
                            style={{ flexDirection: 'row', flex: 1 }}
                        >

                            <Card.Image imageSource={image}
                                style={{ height: 100, width: 100, marginRight: 20 }}
                                cover={true}
                            />

                            <View
                                style={{
                                    justifyContent: 'center',
                                    flex: 1
                                }}
                            >

                                <Text
                                    style={[styles.stripLabel]}
                                    numberOfLines={2}
                                >
                                    {item.name}
                                </Text>

                                <Text
                                    style={[styles.labelSmall]}
                                    numberOfLines={2}
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



                            </View>

                        </View>

                        <View
                            style={{ flexDirection: 'row', flex: 1 }}
                        >
                            <View
                                style={{
                                    flex: 1
                                }}
                            />

                            {this.drawButtonView(item, index)}

                        </View>

                    </View>
                </Card >
            </TouchableWithoutFeedback>
        )

    }


}


