import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import {
    View, TouchableWithoutFeedback, TouchableOpacity, Text,
    ActivityIndicator, FlatList, ScrollView, Image
} from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import ToolBar from '../../components/toolbar'
import fonts from '../../utility/fonts';

var listApiData = {
    page_no: 0,
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


var cartStore, prodStore;

// @inject("cartStore")

@inject(stores => ({
    productsStore: stores.productsStore,
    cartStore: stores.cartStore,
}))
@observer
class Cart extends Component {
    constructor(props) {
        super(props);

        this.onPlusClicked = this.onPlusClicked.bind(this);
        this.onMinusClicked = this.onMinusClicked.bind(this);
        this.onApiActionDone = this.onApiActionDone.bind(this);

        cartStore = this.props.cartStore
        prodStore = this.props.productsStore

        this.resetStore()

    }

    resetStore() {
        cartStore.cart = [];
        cartStore.total = 0;
        cartStore.page = 0;
        cartStore.noOfItems = 0
        cartStore.cartUpdating = false;
        cartStore.apiLoaded = false;
        cartStore.couponCode = '';
        cartStore.couponApplied = false;
        cartStore.refreshing = false;
        cartStore.loading = false;
    }

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                <ToolBar
                    title='Cart To Buy'
                    showTitleH={true}
                    showBackButton={false}
                />
            ),
        };
    };


    componentDidMount() {

        // store.onApiActionDone = this.onApiActionDone;

        cartStore.onApiActionDone = this.onApiActionDone;

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
        cartStore.getCart(formdata, listApiData.page_no)
    }



    render() {
        return (
            <View style={[styles.styleFull]}>

                {
                    cartStore.loading &&
                    global.getLoader()
                }

                {
                    (cartStore.apiLoaded && !cartStore.cart.length)
                    && global.getNoDataView()
                }

                {
                    cartStore.message ?
                        global.getNoDataView(constants.NO_INTERNET_REF, constants.NO_INTERNET_REF) : <View />
                }


                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                > */}
                <View style={[styles.styleFull]}>

                    <FlatList
                        navigation={this.props.navigation}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        data={cartStore.cart}
                        refreshing={cartStore.refreshing}
                        onRefresh={this.handleRefresh.bind(this)}
                        renderItem={this.renderRow.bind(this)}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            this.drawCouponView()
                        } />

                </View>
                {/* </ScrollView> */}
                {this.bottomView()}


            </View>
        );
    }

    handleRefresh() {
        listApiData.page_no = 0
        cartStore.refreshing = true
        this.callApi()
    }

    drawButtonView(item, index) {

    
        if (item.loading)
            return (
                <View
                    style={[styles.plusContainer,{justifyContent:'center'}]}
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
                    labelStyle={{ fontFamily: 'PopinsBold', fontSize: fonts._10, marginTop: 3 }}
                    style={[styles.addContainer]}
                    borderRadius={3}
                    enableShadow
                />

            )

        return (
            <View
                style={[styles.plusContainer, {
                }]}
            >


                <PlusView
                    index={index}
                    type={constants.TYPE_MINUS}
                    onPress={this.onMinusClicked}
                />
                <Text
                    style={[styles.stripLabel, {
                        textAlign: 'center',fontFamily:'PopinsBold',flex:undefined
                        , color: colors.BLACK,fontSize : fonts._18,paddingHorizontal:15
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


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };


    onPlusClicked(index) {
        // cartStore.plusCart(index)

        if (cartStore.cartUpdating)
            return;

        var item = cartStore.cart[index];
        updateApiData.catalogue_id = item.catalogue_id;
        updateApiData.quantity = item.cart_quantity + 1;
        updateApiData.cart_id = item.id;

        cartStore.updateCart(global.sendAsFormData(updateApiData), index, null, constants.TYPE_PLUS)


    }

    onMinusClicked(index) {
        // cartStore.minusCart(index)

        if (cartStore.cartUpdating)
            return;

        var item = cartStore.cart[index];
        updateApiData.catalogue_id = item.catalogue_id;
        updateApiData.quantity = item.cart_quantity - 1;
        updateApiData.cart_id = item.id;

        if (item.cart_quantity == 1)
            cartStore.deleteItem(global.sendAsFormData(updateApiData), index)
        else
            cartStore.updateCart(global.sendAsFormData(updateApiData), index, null, constants.TYPE_MINUS)

    }

    onApiActionDone(item, type) {

        console.log('onApiActionDone: ' + type + ' ' + JSON.stringify(item))

        // if (type == constants.TYPE_MINUS)
        //     prodStore.afterMinusCart(null, item.catalogue_id,false)
        // else if (type == constants.TYPE_PLUS)
        //     prodStore.afterPlusCart(null, item.catalogue_id,false)
        // else prodStore.afterDeleteCart(null, item.catalogue_id,false)

        if (!prodStore.products || !prodStore.products.length)
            return

        let refreshApiData = {
            page_no: 0,
            per_page: 10,
            cat_id: '',
            user_id: ''
        }

        console.log('listApiData.cat_id ' + prodStore.cat_id);
        refreshApiData.cat_id = prodStore.cat_id
        refreshApiData.user_id = listApiData.user_id;

        prodStore.getProducts(global.sendAsFormData(refreshApiData), 0)

    }


    onAddToCart(index) {
        cartStore.addToCart(index)
    }


    navigateTo(screen) {
        this.props.navigation.navigate(screen, {
            total: cartStore.total,
            [constants.PARAM_USER]: listApiData.user_id
        });
    }

    drawCouponView() {

        if (!cartStore.cart || !cartStore.cart.length) {
            return (<View />)
        }

        return (
            <TouchableWithoutFeedback
                onPress={
                    () => {
                        if (!cartStore.couponApplied)
                            this.navigateTo('ApplyCoupon')
                    }
                }
            >

                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginTop: 8,
                        marginBottom:70,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.WHITE
                    }}
                >


                    <IconM name={'brightness-percent'} size={30} color={colors.DARKGRAY} />

                    <View
                        style={{
                            marginLeft: 15,
                            flex: 1
                        }}
                    >

                        <Text
                            style={{
                                fontSize: fonts._12,
                                fontWeight: cartStore.couponApplied ? 'PopinsBold' : 'PopinsReg',
                                color: colors.BLACK
                            }}
                        >
                            {cartStore.couponApplied && cartStore.couponCode ?
                                global.capitalize(cartStore.couponCode) : global.capitalize(constants.TXT_APPLY_COUPON)}{' '}
                        </Text>

                        {
                            cartStore.couponApplied &&
                            <Text
                                style={{
                                    fontSize: fonts._10,
                                    color: colors.DARKGRAY
                                }}
                            >
                                {'Offer Applied on the bill'}{' '}
                            </Text>
                        }

                    </View>

                    <View

                    >

                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            this.showAlertDialog(DIALOG_REMOVE_COUPON)
                        }}
                        underlayColor='transparent'
                    >

                        <View
                            style={cartStore.couponApplied ? global.getCircleViewStyle(20, { backgroundColor: colors.LIGHT_GRAY_TEXT }) :
                                global.getCircleViewStyle(20, { backgroundColor: colors.WHITE })}
                        >
                            {
                                cartStore.couponApplied &&
                                <Icon name={'md-close'} size={25} color={colors.DARKGRAY} />
                            }


                            {
                                !cartStore.couponApplied &&
                                <Icon name={'ios-arrow-forward'} size={25} color={colors.DARKGRAY} />
                            }


                        </View>
                    </TouchableOpacity>

                </View>

            </TouchableWithoutFeedback>

        )
    }

    bottomView() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    if (cartStore.total)
                        this.navigateTo('SelectAddress')
                }}
            >
                <View
                    style={styles.bottomView}
                >

                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE }]}
                    >
                        {constants.TXT_TOTAL + constants.SYMBOL_RUPEE + cartStore.total}
                    </Text>

                    <Text
                        style={[styles.stripLabel, { color: colors.WHITE, flex: undefined }]}
                    >
                        {constants.TXT_CHECKOUT}
                    </Text>


                </View>
            </TouchableWithoutFeedback>
        )
    }


    renderRow({ item, index }) {


        let image = require('../../assets/images/pic2.jpg');
        let variant = '';

        if (Array.isArray(item.variants) && item.variants.length)
            variant = item.variants[0].value;

        if (Array.isArray(item.images) && item.images.length) {
            image = { uri: item.images[0].images };
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
                        style={{ paddingHorizontal: 15, paddingVertical: 15 }}
                    >
                        <View
                            style={{ flexDirection: 'row', flex: 1 }}
                        >

                            <View
                                style={styles.productImage}
                            >
                                <Image source={image}
                                    style={{ width: 70, height: 70 }}
                                />

                            </View>

                            <View
                                style={{
                                    justifyContent: 'center',
                                    flex: 1
                                }}
                            >

                                <Text
                                    style={[styles.stripLabel, {
                                        flex: undefined
                                    }]}
                                    numberOfLines={2}
                                >
                                    {item.name}
                                </Text>

                                {/* <Text
                                    style={[styles.labelSmall]}
                                    numberOfLines={2}
                                >
                                    {item.description}
                                </Text> */}

                                <Text
                                    style={[styles.weight]}
                                >

                                    {variant}

                                </Text>

                                <Text
                                    style={[styles.amount, { marginTop: 8 }]}
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

                        <TouchableWithoutFeedback
                            onPress={() => {
                                removeCartApiData.cart_id = item.id
                                cartStore.deleteItem(global.sendAsFormData(removeCartApiData), index);
                            }}
                        >
                            <Icon name={'ios-close'} size={30} color={colors.BLACK}
                                style={{
                                    position: 'absolute',
                                    top: 5,
                                    padding: 5,
                                    right: 20
                                }}
                            />

                        </TouchableWithoutFeedback>


                    </View>
                </Card >
            </TouchableWithoutFeedback>
        )

    }





}

export default Cart


