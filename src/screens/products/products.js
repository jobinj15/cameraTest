import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, FlatList, StyleSheet } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';

var apiData = {
    page_no: 0,
    per_page: 10,
    cat_id: '',
    user_id: 1
}

var store;


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
        store = this.props.productsStore
    }

    componentDidMount() {

        global.getItem(constants.USER).then(result => {
            // if (!result) return;
            // apiData.user_id
            this.callApi()
        });

    }

    callApi() {
        let formdata = new FormData();
        for (let key in apiData) {
            formdata.append(key, apiData[key]);
        }
        store.getProducts(formdata, apiData.page_no)
    }


    handleRefresh() {
        apiData.page_no = 0
        store.refreshing = true
        this.callApi()
    }


    handleLoadMore() {
        console.log('handleLoadMore called!')
        apiData.page_no = apiData.page_no + 1;
        this.callApi()
    }



    render() {

        return (
            <View style={[styles.styleFull]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.props.productsStore.products}
                    renderItem={this.renderRow.bind(this)}
                    onRefresh={this.handleRefresh.bind(this)}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.1}
                    refreshing={store.refreshing}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {
                    store.loading &&
                    global.getLoader()
                }

                {
                    (store.apiLoaded && !store.products.length)
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
        this.props.navigation.navigate('ProductDetail', {
            [constants.PARAM_INDEX]: index,
        });
    }


    onPlusClicked(index) {
        const item = this.props.productsStore.plusCart(index)
        console.log("Item onPlusClicked: " + JSON.stringify(item))
        this.props.cartStore.plusCart(null, item.id)
    }

    onMinusClicked(index) {
        const item = this.props.productsStore.minusCart(index)
        this.props.cartStore.minusCart(null, item.id)
    }

    onAddToCart(index) {
        const item = this.props.productsStore.addToCart(index)
        console.log("Item added: " + JSON.stringify(item))
        this.props.cartStore.addToCart(null, item)
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
                            style={{ flexDirection: 'row', flex: 2 }}
                        >
                            <View
                                style={{
                                    flex: 1
                                }}
                            />

                            {
                                isNaN(item.count) &&
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
                            }


                            {
                                !isNaN(item.count) && (

                                    <View
                                        style={[styles.plusContainer, {
                                            marginTop: 10,
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
                                        >{item.count}</Text>

                                        <PlusView
                                            index={index}
                                            type={constants.TYPE_PLUS}
                                            onPress={this.onPlusClicked}
                                        />
                                    </View>
                                )
                            }
                        </View>

                    </View>
                </Card >
            </TouchableWithoutFeedback>
        )

    }


}


