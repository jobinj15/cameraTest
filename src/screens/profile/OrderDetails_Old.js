import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import PTRView from 'react-native-pull-to-refresh';
import ToolBar from '../../components/toolbar';

var orderDetailApiData = {
    user_id: '',
    order_id: ''
}
var store;

@inject("orderDetailsStore")
@observer
export default class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        store = this.props.orderDetailsStore;

        const { navigation } = this.props
        this.state.order = navigation.getParam(constants.PARAM_ORDER, null)
        this.state.userId = navigation.getParam(constants.PARAM_USER, null)

        this.setApiData()
    }

    resetStore(){
        store.isApiLoaded = false;
        store.loading = false;
        // store.refreshing = false;
        store.message = '';
        store.order = {}
    }

    setApiData() {
        orderDetailApiData.user_id = this.state.userId;
        orderDetailApiData.order_id = this.state.order.id
    }

    componentDidMount() {
        this.callApi()
    }

    callApi() {
        store.getOrderDetails(global.sendAsFormData(orderDetailApiData))
    }

    componentWillUnmount() {
        store.isApiLoaded = false;
        store.order = {}
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <ToolBar
                    title={'Order Details'}
                    showTitle={true}
                    navigation={navigation}
                    showBackButton={true}
                />
            ),
        };
    };


    navigateTo(item) {
        if (item.navigate)
            this.props.navigation.navigate(item.navigate, {
                // [constants.PARAM_INDEX]: index,
            });
    }

    //0 4 8 
    render() {

        if (store.message) {
            return (
                global.getNoDataView(constants.NO_INTERNET_REF, constants.NO_INTERNET_REF)
            )
        }

        if (store.isApiLoaded && !store.order.id)
            return (
                global.getNoDataView()
            )

        // if (!store.isApiLoaded && !store.loading)
        //     return (
        //         <View/>
        //     )

        if (store.loading) {
            return (
                global.getLoader()
            )
        }

        var image = require('../../assets/images/pic1.jpg');

        if (store.order.image) {
            image = { uri: store.order.image };
        }

        return (
            // <PTRView
            //     onRefresh={this.callApi()}
            // >
                <View style={[styles.styleFull, { backgroundColor: colors.ListViewBG }]}>

                    <ScrollView>

                        <View>

                            <Card style={{ borderRadius: 0 }} >

                                <Text
                                    style={[styles.labelSmall, {
                                        color: colors.DARKGRAY,
                                        fontWeight: global.FONT_FAMILY.PopinsBold, padding: 15
                                    }]}
                                >
                                    {'Placed on ' + store.order.order_date}
                                </Text>

                                <View
                                    style={[styles.largeButton,{width:'90%'}]}
                                >
                                    <Text
                                        style={[styles.stripLabel, { color: colors.WHITE, flex: undefined }]}
                                    >
                                        {store.order.order_status_name}
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
                                    {store.order.total_quantity + ' Items  |  Amount '
                                        + constants.SYMBOL_RUPEE + store.order.total}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingVertical: 15
                                    }}
                                >

                                    <Card.Image imageSource={image}
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
                                            {store.order.name}
                                        </Text>

                                        <Text
                                            style={[styles.amount, { marginTop: 10 }]}
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

                                {this.drawKeyValue('Price', store.order.price, { marginTop: 10 })}
                                {/* {this.drawKeyValue(constants.TXT_SAVINGS, store.order.savings, { marginTop: 5 },{color:colors.GREEN_4})} */}
                                {this.drawKeyValue('Quantity', store.order.quantity, { marginTop: 5 })}
                                {this.drawKeyValue('SubTotal', store.order.subtotal, { marginTop: 5 })}

                                {this.drawKeyValue('Total', store.order.total, { marginTop: 10 }, { color: colors.GREEN_4 })}
                            </Card>
                        </View>
                    </ScrollView>
                </View>
            // </PTRView>
        );
    }


    drawKeyValue(key, value, moreStyles = {}, fontColor = {color:colors.DARKGRAY}) {

        return (
            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.labelKey, { flex: 1, fontFamily: global.FONT_FAMILY.PopinsMed }, fontColor]}
                >
                    {key}

                </Text>

                <Text
                    style={[styles.labelSmallX1, fontColor]}
                >
                    {value}

                </Text>


            </View>
        )

    }




}








