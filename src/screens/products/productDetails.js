import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback,TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
import Ripple from 'react-native-material-ripple';


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
                <View />
            )
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
                        marginTop: i == 0 ? 0 : 20, width: global.DEVICE_WIDTH - 40,
                    }} key={i.toString()}

                >
                    <Text
                        style={[styles.productKey, {
                            marginRight: 20,
                        }]}
                    >
                        {mainItem.optionmastername}
                    </Text>

                    <View
                        style={[styles.wrap]}
                    >
                        {
                            mainItem.data.map((subItem, subIndex) => {
                                return (
                                    <Ripple
                                        onPress={() => {
                                            this.modifyVariantSelection(i, subIndex)
                                        }}
                                        key={(i + subIndex).toString()}
                                        style={{
                                            marginLeft: subIndex == 0 ? 0 : 15
                                        }}

                                    >
                                        <Text
                                            style={[styles.variant,
                                            {
                                                backgroundColor: subItem.selected ? colors.PRIMARY : colors.WHITE,
                                                borderColor: subItem.selected ? colors.BORDER : colors.PRIMARY,
                                                color: subItem.selected ? colors.WHITE : colors.GREY
                                            }]}
                                        >
                                            {subItem.name}
                                        </Text>
                                    </Ripple>
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

    goBack(){
        this.props.navigation.pop()
    }

    drawbackButton() {
        return (
            <TouchableWithoutFeedback
            onPress={()=>{
                this.goBack()
            }}
            >
                <View
                    style={[styles.topLeft]}
                >
                    <IconM name={'arrow-back'} size={25} color={colors.WHITE} 
                    style={{backgroundColor:colors.TRANS_BLACK,borderRadius:41/2,padding:8}}
                    />

                </View>
            </TouchableWithoutFeedback>
        )
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

        var images = [require('../../assets/images/pic2.jpg')];

        if (Array.isArray(item.images) && item.images.length) {
            images = item.images;
        }


        return (
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE }]}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <SliderBox
                            images={images}
                            sliderBoxHeight={300}
                        />

                        <View
                            style={{
                                paddingHorizontal: 15,
                                marginTop: 20
                            }}
                        >



                            <Text
                                style={[styles.bigBold]}
                            >
                                {item.name}
                            </Text>


                            {/* <Text
                            style={[styles.labelSmall, { marginTop: 8 }]}
                        >

                            {item.quantity}

                        </Text> */}

                            <View
                                style={{ flexDirection: 'row', alignSelf: 'stretch', marginVertical: 8 }}
                            >
                                <Text
                                    style={[styles.amount, { flex: 1 }]}
                                >

                                    {constants.SYMBOL_RUPEE + item.price}

                                </Text>


                                {this.drawButtonView(item)}

                            </View>




                            {this.drawVariants(item)}

                            <Text
                                style={[styles.productKey, { marginTop: 20 }]}
                            >
                                {constants.TXT_DESC}
                            </Text>
                            <Text
                                style={[styles.labelSmall, { marginBottom: 25 }]}
                            >
                                {item.description}
                            </Text>



                            {/* {this.bottomView()}
                        {
                            item.cart_quantity ? global.bottomBlockView() : <View />
                        } */}
                        </View>

                        {this.drawbackButton()}

                    </View>

                </ScrollView>

            </View >
        );
    }

    drawButtonView(item) {

        if (item.loading)
            return (
                <View
                    style={[styles.plusContainer, {
                        justifyContent: 'center',
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
                        this.onAddToCart();
                    }}
                    labelStyle={{ fontFamily: 'PopinsBold', fontSize: fonts._10 }}
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


