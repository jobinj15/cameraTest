import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import ToolBar from '../../components/toolbar';
import { ScrollView } from 'react-native-gesture-handler';

var prodDetStore, prodListStore, cartStore;

var addApiData = {
    user_id: '',
    catalogue_id: '',
    quantity: ''
}

var detailApiData = {
    catlogue_id: '',
    user_id: ''
}

var variantApiData = {
    product_id: '',
    user_id: '',
    options: ''
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
    productsListStore: stores.productsStore,
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
        this.onApiActionDone = this.onApiActionDone.bind(this);

        prodDetStore = this.props.productDetailsStore
        prodListStore = this.props.productsListStore
        cartStore = this.props.cartStore

        // prodDetStore.onApiActionDone = this.onApiActionDone;

        this.reset()

        const { navigation } = this.props
        this.state.product = navigation.getParam(constants.PARAM_PRODUCT, null)

    }

    static navigationOptions = ({ navigation }) => {
        console.log('Navigation ProdList: ' + navigation)
        return {
            header: (
                <ToolBar
                    title={'Details'}
                    showTitle={true}
                    navigation={navigation}
                    showBackButton={true}
                />
            ),
        };
    };


    componentDidMount() {

        // this.props.navigation.setParams({ routeName: 'Updated!' })

        console.log('ProdDetails: ' + JSON.stringify(this.props.navigation))

        prodDetStore.setOnApiActionDone(this.onApiActionDone)

        global.getItem(constants.USER).then(result => {
            if (!result) return;
            this.setUserIdToApiData(result)
            this.callApi();
        });

    }

    onApiActionDone(item, type) {
        console.log('onApiActionDone prodDetais')

        let cartListApiData = {
            page_no: 0,
            user_id: addApiData.user_id
        }

        cartStore.getCart(global.sendAsFormData(cartListApiData), 0)

        if (!prodListStore.products || !prodListStore.products.length)
            return

        let refreshApiData = {
            page_no: 0,
            per_page: 10,
            cat_id: '',
            user_id: ''
        }

        console.log('listApiData.cat_id ' + prodListStore.cat_id);
        refreshApiData.cat_id = prodListStore.cat_id
        refreshApiData.user_id = addApiData.user_id;

        prodListStore.getProducts(global.sendAsFormData(refreshApiData), 0)


    }

    reset() {
        prodDetStore.isApiLoaded = false;
        prodDetStore.loading = false;
        prodDetStore.refreshing = false;
        prodDetStore.message = '';
        prodDetStore.product = {}
    }

    setUserIdToApiData(result) {
        addApiData.user_id = result.user_id
        detailApiData.user_id = result.user_id
        removeCartApiData.user_id = result.user_id
        updateApiData.user_id = result.user_id
        variantApiData.user_id = result.user_id;
    }

    callApi() {
        detailApiData.catlogue_id = this.state.product.id
        prodDetStore.getProductDetails(global.sendAsFormData(detailApiData))
    }

    callVariantApi(variants) {
        variantApiData.product_id = this.state.product.product_id;
        variantApiData.options = variants
        prodDetStore.getProductVariant(global.sendAsFormData(variantApiData))

    }

    modifyVariantSelection(index, subIndex) {

        var variants = [...prodDetStore.product.variants];

        var toModifiedvariant = variants[index].data

        var size = toModifiedvariant.length;
        var item;
        for (var i = 0; i < size; i++) {
            item = toModifiedvariant[i];

            if (i == subIndex)
                item.selected = true;
            else item.selected = false;
        }


        var newSelections = [];

        for (let nItem of variants) {

            for (let nSubItem of nItem.data) {

                if (nSubItem.selected)
                    newSelections.push(nSubItem.value_id)

            }

        }

        console.log('modifyVariantSelection after ' + JSON.stringify(newSelections));
        this.callVariantApi(newSelections.toString())
    }


    drawVariants(item) {

        if (!item.variants || !item.variants.length)
            return (
                <View />
            )

        console.log('drawVariants ' + JSON.stringify(item.variants))

        var variantsList = [];
        var variants = item.variants;
        var mainItem;
        var outerSize = variants.length;

        for (let i = 0; i < outerSize; i++) {

            mainItem = variants[i];

            variantsList.push(

                <View
                    style={{
                        flexDirection: 'row', marginTop: 10, width: global.DEVICE_WIDTH - 40,
                        height: 50
                    }} key={i.toString()}

                >
                    <Text
                        style={[styles.labelSmallX1, { marginRight: 20, color: colors.DARKGRAY2 }]}
                    >
                        {mainItem.optionmastername}
                    </Text>

                    <View
                        style={[styles.wrap]}
                    >
                        {
                            mainItem.data.map((subItem, subIndex) => {
                                return (
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.modifyVariantSelection(i, subIndex)
                                        }}
                                        key={(i + subIndex).toString()}
                                    >
                                        <View
                                            style={{
                                                marginLeft: 3
                                            }}
                                        >
                                            <Text
                                                style={[styles.variant,
                                                { backgroundColor: subItem.selected ? colors.PRIMARY : colors.GREY }]}
                                            >
                                                {subItem.name}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>

                </View>
            )
        }

        console.log("variantsList : " + variantsList)
        return variantsList;

    }


    render() {

        if (prodDetStore.message) {
            return (
                global.getNoDataView(constants.NO_INTERNET_REF, constants.NO_INTERNET_REF)
            )
        }

        if (prodDetStore.isApiLoaded && !prodDetStore.product.id)
            return (
                global.getNoDataView()
            )

        if (!prodDetStore.isApiLoaded && !prodDetStore.loading)
            return (
                <View />
            )

        if (prodDetStore.loading) {
            return (
                global.getLoader()
            )
        }

        const item = prodDetStore.product;
        console.log('ProductDetails ' + JSON.stringify(item))

        var image = require('../../assets/images/pic2.jpg');
        // var image;

        if (Array.isArray(item.images) && item.images.length) {
            image = { uri: item.images[0].images };
            // console.log('Products row ' + JSON.stringify(image))
        }


        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View> */}
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
                                style={[styles.stripLabel]}
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
                                style={[styles.amount, { marginTop: 8 }]}
                            >

                                {constants.SYMBOL_RUPEE + item.price}

                            </Text>


                            <View
                                style={{
                                    marginVertical: 15
                                }}
                            >
                                {
                                    //     <View
                                    //         style={{
                                    //             backgroundColor: 'red', width:50,
                                    //             height: 50
                                    //         }}
                                    //     ></View>
                                    this.drawVariants(item)
                                }

                            </View>


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
                            item.cart_quantity ? global.bottomBlockView() : <View />
                        }
                    {/* </View>

                </ScrollView> */}

            </View >
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
                }]}
            >

                <PlusView
                    index={0}
                    type={constants.TYPE_MINUS}
                    onPress={this.onMinusClicked}
                />
                <Text
                    style={[styles.stripLabel, {
                        textAlign: 'center', fontFamily: 'PopinsBold', flex: undefined
                        , color: colors.BLACK, fontSize: fonts._18, paddingHorizontal: 15
                    }]}
                >{item.cart_quantity}</Text>

                <PlusView
                    index={0}
                    type={constants.TYPE_PLUS}
                    onPress={this.onPlusClicked}
                />
            </View>
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

        if (prodDetStore.cartUpdating)
            return;

        var item = prodDetStore.product;
        updateApiData.catalogue_id = item.id;
        updateApiData.quantity = item.cart_quantity + 1;
        updateApiData.cart_id = item.cart_id;

        console.log('ProdDetails: ' + JSON.stringify(updateApiData))

        prodDetStore.updateCart(global.sendAsFormData(updateApiData), constants.TYPE_PLUS)


    }

    onMinusClicked() {
        // const item = prodDetStore.minusCart(this.state.index)
        // cartStore.minusCart(null, item.id)

        if (prodDetStore.cartUpdating)
            return;

        var item = prodDetStore.product;
        updateApiData.catalogue_id = item.id;
        updateApiData.quantity = item.cart_quantity - 1;
        updateApiData.cart_id = item.cart_id;

        if (item.cart_quantity == 1)
            prodDetStore.deleteItem(global.sendAsFormData(updateApiData))
        else
            prodDetStore.updateCart(global.sendAsFormData(updateApiData), constants.TYPE_MINUS)
    }

    onAddToCart() {

        if (prodDetStore.cartUpdating)
            return;

        var item = prodDetStore.product;
        addApiData.catalogue_id = item.id;
        addApiData.quantity = 1;

        prodDetStore.addToCart(global.sendAsFormData(addApiData))
    }

}


