import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { Card, Button } from 'react-native-ui-lib';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { observer, inject } from "mobx-react";
import constants from '../../utility/constants';
import colors from '../../styles/colors';
import PlusView from '../../components/custom_views/plusView';
import Icon from 'react-native-vector-icons/Ionicons';

@inject("cartStore")
@observer
export default class Cart extends Component {
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
                    data={this.props.cartStore.cart}
                    renderItem={this.renderRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                />

                {this.bottomView()}

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


    onPlusClicked(index) {
        this.props.cartStore.plusCart(index)
    }

    onMinusClicked(index) {
        this.props.cartStore.minusCart(index)
    }

    onAddToCart(index) {
        this.props.cartStore.addToCart(index)
    }

    bottomView() {
        return (
            <View
                style={styles.bottomView}
            >

                <Text
                    style={[styles.stripLabel, { color: colors.WHITE }]}
                >
                    {constants.TXT_TOTAL + constants.SYMBOL_RUPEE + this.props.cartStore.total}
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
                                style={[styles.stripLabel,{marginTop:10}]}
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

                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.cartStore.deleteItem(index);
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


