import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';

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
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

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
        this.props.cartStore.plusCart(null, item.productId)
    }

    onMinusClicked(index) {
        const item = this.props.productsStore.minusCart(index)
        this.props.cartStore.minusCart(null, item.productId)
    }

    onAddToCart(index) {
        const item = this.props.productsStore.addToCart(index)
        console.log("Item added: " + JSON.stringify(item))
        this.props.cartStore.addToCart(null, item)
    }

    renderRow({ item, index }) {

        // console.log('Products row ' + JSON.stringify(item))

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
                            style={{ flexDirection: 'row' }}
                        >

                            <Card.Image imageSource={item.image}
                                style={{ height: 100, width: 100, marginRight: 20 }}
                                cover={true}
                            />

                            <View
                                style={{
                                    justifyContent: 'center'
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


