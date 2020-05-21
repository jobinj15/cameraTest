import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, ActivityIndicator, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import Icon from 'react-native-vector-icons/Ionicons';
import ToolBar from '../../components/toolbar'

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


var cartStore;

@inject("cartStore")
@observer
class Cart extends Component {
    constructor(props) {
        super(props);

        this.onPlusClicked = this.onPlusClicked.bind(this);
        this.onMinusClicked = this.onMinusClicked.bind(this);
        cartStore = this.props.cartStore
    }

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header 
        return {
            header: (
                <ToolBar
                    title='Cart'
                    showTitleH={true}
                    showBackButton={false}
                />
            ),
        };
    };


    componentDidMount() {

        // store.onApiActionDone = this.onApiActionDone;

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

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={cartStore.cart}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {this.bottomView()}

                {
                    cartStore.loading &&
                    global.getLoader()
                }

                {
                    (cartStore.apiLoaded && !cartStore.cart.length)
                    && global.getNoDataView()
                }

            </View>
        );
    }

    drawButtonView(item, index) {

        if (index == 0)
            console.log('drawButtonView: ' + JSON.stringify(item))

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



    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator}
            />
        );
    };


    onPlusClicked(index) {
        cartStore.plusCart(index)
    }

    onMinusClicked(index) {
        cartStore.minusCart(index)
    }

    onAddToCart(index) {
        cartStore.addToCart(index)
    }

    bottomView() {
        return (
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
        )
    }

    renderRow({ item, index }) {

        // console.log('Products row ' + JSON.stringify(item))

        var image = require('../../assets/images/pic2.jpg');

        if (Array.isArray(item.images) && item.images.length) {
            image = { uri: item.images[0].images };
            console.log('Products row ' + JSON.stringify(image))
        }

        return (

            <Card style={{ flex: 1, borderRadius: 0 }} key={index}>

                <View
                    style={{ padding: 10, flex: 1 }}
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
                                style={[styles.stripLabel, { marginTop: 10 }]}
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
        )

    }


}

export default Cart


