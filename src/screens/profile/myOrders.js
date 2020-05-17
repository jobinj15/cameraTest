import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';


@inject("myOrdersStore")
@observer
export default class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    navigateTo() {
        constants.NAVIGATION.navigate('OrderDetails', {
            // [constants.PARAM_INDEX]: index,
        });
    }

    //0 4 8 
    render() {
        return (
            <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={this.props.myOrdersStore.orders}
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

    drawKeyValue(key, value, moreStyles = {}) {

        return (

            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.stripLabel, { flex: undefined }]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmall, { marginLeft: 15 }]}
                >
                    {value}

                </Text>


            </View>
        )

    }

    renderRow({ item, index }) {

        console.log('Orders row ' + JSON.stringify(item))

        return (

            <TouchableWithoutFeedback
                onPress={() => {
                    this.navigateTo()
                }}
            >
                <Card style={{ flex: 1, borderRadius: 0 }} key={index}>

                    <View
                        style={{ padding: 15 }}
                    >

                        <View
                            style={{
                                flex: 1, flexDirection: 'row'
                            }}
                        >
                            {this.drawKeyValue(constants.TXT_ORDERNO, item.orderId)}

                            <Text
                                style={[styles.stripLabel, { color: colors.GREEN_4, flex: undefined }]}
                            >
                                {item.date}

                            </Text>

                        </View>

                        {this.drawKeyValue(constants.TXT_TOTAL, item.total, { marginTop: 5 })}
                        {this.drawKeyValue(constants.TXT_ITEMS, item.items, { marginTop: 5 })}

                        <Text
                            style={[
                                styles.labelSmall
                            ], {
                                marginTop: 10,
                                textAlign: 'right',
                                flex: 1
                            }}
                        >
                            {item.status}

                        </Text>

                    </View>

                </Card>

            </TouchableWithoutFeedback>

        )

    }


}








