import React, { Component } from 'react';
import styles from '../../styles/style';
import global from '../../utility/global';
import { View, TouchableWithoutFeedback, Text, Image, FlatList } from 'react-native';
import { Card, Button } from 'react-native-ui-lib';
import { observer, inject } from "mobx-react";
import colors from '../../styles/colors';
import constants from '../../utility/constants';
import PTRView from 'react-native-pull-to-refresh';
import ToolBar from '../../components/toolbar';
import fonts from '../../utility/fonts';

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

    resetStore() {
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
            <View style={[styles.styleFull, { backgroundColor: colors.WHITE, paddingHorizontal: 15 }]}>

                <FlatList
                    navigation={this.props.navigation}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    data={[]}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        this.getHeaders()
                    }
                    ListFooterComponent={
                        this.getFooters()
                    }
                />


            </View>
        );
    }

    getHeaders() {

        var item = store.order;

        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        marginTop: 20,
                        alignItems: 'center',
                        alignSelf: 'stretch'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Text
                            style={[styles.labelSmall, { color: colors.BLACK }]}
                        >
                            {item.order_date}

                        </Text>

                        <Text
                            style={[styles.labelSmall, { color: colors.BLACK }]}
                        >
                            {constants.TXT_ORDERNO.replace('No', 'ID') + this.state.order.order_id}

                        </Text>


                    </View>

                    <View
                        style={{
                            flexDirection: 'row', alignItems: 'center'
                        }}
                    >
                        <Text
                            style={[styles.labelSmall, { color: colors.BLACK }]}
                        >
                            {'Amt: '}

                        </Text>

                        <Text
                            style={[styles.labelKey, { color: colors.PRIMARY, flex: undefined }]}
                        >
                            {constants.SYMBOL_RUPEE + item.total}

                        </Text>

                    </View>

                </View>

                <Text
                    style={[styles.productKey,{fontSize:fonts._16,marginTop:25,marginBottom:15}]}
                >
                    {constants.TXT_ORDERED}
                </Text>


            </View>
        )
    }

    getFooters() {
        return (
            <View>

            </View>)
    }


    drawKeyValue(key, value, moreStyles = {}, fontColor = { color: colors.DARKGRAY }) {

        return (
            <View
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                }, moreStyles]}
            >

                <Text
                    style={[styles.labelKey, { flex: 1, fontWeight: 'PopinsMed' }, fontColor]}
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








