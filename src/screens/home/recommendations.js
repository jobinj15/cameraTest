import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import { observer, inject } from "mobx-react";

@inject("recoHomeStore")
export default class Reommendations extends Component {
    constructor(props) {
        super(props);
    }

    //0 4 8 
    render() {
        return (
            <View style={[styles.styleFull,{ backgroundColor: colors.WHITE }, this.props.style ? this.props.style : {}]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.props.recoHomeStore.recomm}
                    renderItem={this.renderRow.bind(this)}
                    style={{backgroundColor:colors.WHITE}}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}

                />

            </View>
        );
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
                        // this.onAddToCart(index);
                    }}
                    labelStyle={{ fontFamily: 'PopinsBold', fontSize: fonts._10}}
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
                    // onPress={this.onMinusClicked}
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
                    // onPress={this.onPlusClicked}
                />
            </View>
        )

    }


    drawButtonViewOld(item, index) {

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
                        // this.onAddToCart(index);
                    }}
                    labelStyle={{ fontFamily: 'PopinsBold', fontSize: fonts._10, marginTop: 3 }}
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
                    // onPress={this.onMinusClicked}
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
                    // onPress={this.onPlusClicked}
                />
            </View>
        )

    }


    renderSeparator = () => {
        return (
            <View
                style={styles.productSeperator2}
            />
        );
    };


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
                        // this.navigateTo('ProductDetail', index)
                    }
                }
            >
                <Card style={{ flex: 1, borderRadius: 0 }} key={index} elevation={0} enableShadow={false}>

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

                                <View
                                    style={{
                                        flexDirection: 'row', marginTop: 8, flex: 1, alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={[styles.amount]}
                                    >
                                        {constants.SYMBOL_RUPEE + item.price}
                                    </Text>

                                    <Text
                                        style={[styles.amount, {
                                            marginLeft: 10, fontSize: fonts._15,flex:1,
                                            textDecorationLine: 'line-through', color: colors.DISCOUNT
                                        }]}
                                    >
                                        {constants.SYMBOL_RUPEE + '22'}
                                    </Text>
                                    {this.drawButtonView(item, index)}
                                </View>


                            </View>

                        </View>

                    </View>
                </Card >
            </TouchableWithoutFeedback>
        )

    }



}


