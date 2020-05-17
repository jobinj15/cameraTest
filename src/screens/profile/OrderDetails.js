import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';


@inject("orderDetailsStore")
@observer
export default class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    navigateTo(item) {
        if (item.navigate)
            this.props.navigation.navigate(item.navigate, {
                // [constants.PARAM_INDEX]: index,
            });
    }

    //0 4 8 
    render() {

        const store = this.props.orderDetailsStore;

        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <ScrollView>

                    <View>

                        <Card style={{ borderRadius: 0 }} >

                            <Text
                                style={[styles.labelSmall, {
                                    color: colors.DARKGRAY,
                                    fontWeight: 'bold', padding: 15
                                }]}
                            >
                                {'Placed on ' + store.order.date}
                            </Text>

                            <View
                                style={styles.largeButton}
                            >
                                <Text
                                    style={[styles.stripLabel, { color: colors.WHITE, flex: undefined }]}
                                >
                                    {constants.TXT_ORDER_SUCCESS}
                                </Text>

                            </View>

                            <Text
                                style={[styles.labelSmall, { margin: 15 }]}
                            >
                                {constants.TXT_DELIVERED_ON}
                            </Text>

                            <Text
                                style={[styles.stripLabel, { paddingBottom: 15, paddingHorizontal: 15 }]}
                            >
                                {store.order.date}
                            </Text>

                        </Card>

                        <Card
                            style={{
                                marginTop: 10, padding: 15
                            }}
                            borderRadius={0}
                        >

                            <Text
                                style={[styles.stripLabel, {}]}
                            >
                                {store.order.items + ' Items  |  Amount '
                                    + constants.SYMBOL_RUPEE + store.order.total}
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 15
                                }}
                            >

                                <Card.Image imageSource={require('../../assets/images/pic1.jpg')}
                                    style={{ height: 100, width: 100, marginRight: 20 }}
                                    cover={true}
                                />

                                <View
                                    style={{
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={[styles.stripLabel, { flex: undefined }]}
                                    >
                                        {'Starfish Surti'}
                                    </Text>

                                    <Text
                                        style={[styles.labelSmall, { marginTop: 10 }]}
                                    >
                                        {constants.SYMBOL_RUPEE + '307.80'}
                                    </Text>


                                </View>
                            </View>

                        </Card>


                        <Card
                            style={{
                                marginTop: 10,
                                padding: 15
                            }}
                            borderRadius={0}
                        >
                            <Text
                                style={[styles.stripLabel, { flex: undefined, color: colors.DARKGRAY2 }]}
                            >
                                {constants.TXT_PAYMENT_DETAILS}
                            </Text>

                            {this.drawKeyValue(constants.TXT_ORDER_TOTAL, store.order.total, { marginTop: 5 })}
                            {this.drawKeyValue(constants.TXT_SAVINGS, store.order.savings, { marginTop: 5 },{color:colors.GREEN_4})}
                            {this.drawKeyValue(constants.TXT_NET_AMT, '1110', { marginTop: 5 })}


                        </Card>


                    </View>
                </ScrollView>
            </View>
        );
    }


    drawKeyValue(key, value, moreStyles = {},fontColor={}) {

        return (
            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.stripLabel, { flex: 1, fontWeight: '500' },fontColor]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmall,fontColor]}
                >
                    {value}

                </Text>


            </View>
        )

    }




}








